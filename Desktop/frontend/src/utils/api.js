import axios from "axios";

/**
 * BASE URL LOGIC
 * - Local development  → http://localhost:5000/api
 * - Production (EC2 + Nginx) → /api
 */
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api";

/**
 * AXIOS INSTANCE
 */
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // increased for slow networks
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * Attach JWT token automatically
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Centralized & SAFE error handling
 */
API.interceptors.response.use(
  (response) => response,

  (error) => {
    /**
     * ❌ Backend unreachable (server down, wrong URL, blocked port)
     */
    if (!error.response) {
      console.error("API unreachable:", error.message);

      return Promise.reject({
        status: 0,
        message:
          "Unable to connect to server. Please check your internet or try again later.",
      });
    }

    const { status, data } = error.response;

    /**
     * ❌ Unauthorized (JWT expired / invalid)
     */
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");

      return Promise.reject({
        status,
        message: data?.message || "Session expired. Please login again.",
      });
    }

    /**
     * ❌ Forbidden
     */
    if (status === 403) {
      return Promise.reject({
        status,
        message: data?.message || "You do not have permission to perform this action.",
      });
    }

    /**
     * ❌ Not Found
     */
    if (status === 404) {
      return Promise.reject({
        status,
        message: "Requested API endpoint not found.",
      });
    }

    /**
     * ❌ Server Errors
     */
    if (status >= 500) {
      return Promise.reject({
        status,
        message:
          data?.message ||
          "Server error occurred. Please try again later.",
      });
    }

    /**
     * ❌ Validation / Other Errors
     */
    return Promise.reject({
      status,
      message: data?.message || "Something went wrong. Please try again.",
    });
  }
);

export default API;
