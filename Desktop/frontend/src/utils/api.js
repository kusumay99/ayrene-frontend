// src/utils/api.js
import axios from "axios";

/**
 * BASE URL LOGIC
 * - Local dev  → http://localhost:5000/api
 * - Production → /api  (Nginx proxy)
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
  timeout: 10000,
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
 * Centralized error handling
 */
API.interceptors.response.use(
  (response) => response,

  (error) => {
    // 🔴 Backend unreachable
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message: "Server unreachable. Please try again later.",
      });
    }

    const { status, data } = error.response;

    // 🔴 Unauthorized (token expired / invalid)
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");

      return Promise.reject({
        status,
        message: data?.message || "Unauthorized. Please login again.",
      });
    }

    // 🔴 Forbidden
    if (status === 403) {
      return Promise.reject({
        status,
        message: "Access denied.",
      });
    }

    // 🔴 Not Found
    if (status === 404) {
      return Promise.reject({
        status,
        message: "API endpoint not found.",
      });
    }

    // 🔴 Server error
    if (status >= 500) {
      return Promise.reject({
        status,
        message: "Internal server error.",
      });
    }

    // 🔴 Default
    return Promise.reject({
      status,
      message: data?.message || "Something went wrong.",
    });
  }
);

export default API;
