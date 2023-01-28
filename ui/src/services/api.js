import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      // handle unauthorized error, like redirecting to login page
    }
    if (status === 403) {
      // handle forbidden error, like showing a modal or a snackbar
    }
    return Promise.reject(error);
  }
);

export default api;
