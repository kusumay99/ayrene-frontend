// src/utils/api.js
import axios from "axios";

/**
 * IMPORTANT:
 * Do NOT use localhost in production.
 * Use relative /api so Nginx can proxy to backend.
 */
const API = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 seconds
});

/**
 * REQUEST INTERCEPTOR
 * Attach JWT token if available
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject({
      status: 0,
      message: "Request initialization failed",
    });
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Centralized error handling (LOGIN SAFE)
 */
API.interceptors.response.use(
  (response) => response,

  (error) => {
    // 🔴 Server unreachable (EC2 down / port blocked)
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message:
          "Unable to connect to server. Please try again later.",
      });
    }

    const { status, data } = error.response;

    // 🔴 Unauthorized (wrong login / expired token)
    if (status === 401) {
      localStorage.removeItem("token");
      return Promise.reject({
        status,
        message: data?.message || "Invalid email or password",
      });
    }

    // 🔴 Forbidden
    if (status === 403) {
      return Promise.reject({
        status,
        message: "You are not authorized to perform this action",
      });
    }

    // 🔴 Not found
    if (status === 404) {
      return Promise.reject({
        status,
        message: "API endpoint not found",
      });
    }

    // 🔴 Server error
    if (status >= 500) {
      return Promise.reject({
        status,
        message: "Server error. Please try again later.",
      });
    }

    // 🔴 Default error
    return Promise.reject({
      status,
      message: data?.message || "Something went wrong",
    });
  }
);

export default API;
