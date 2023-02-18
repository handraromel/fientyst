import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": sessionStorage.getItem("token") || "",
  },
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
