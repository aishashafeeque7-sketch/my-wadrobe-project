// This file is our one place to talk to the backend.
// Every page imports "api" from here instead of writing axios code everywhere.

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Before every request, this automatically attaches the login token
// (if we have one saved) so the backend knows who is asking
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
