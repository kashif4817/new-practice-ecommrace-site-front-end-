import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request interceptor
// api.interceptors.request.use(
//     (config) => {
//         console.log("Enter in request interceptor.", config)
//         return config
//     },
//     console.log("outside the config"),
//     (error) => Promise.reject(error),
//     console.log("Exit in request interceptor.")
// )

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("originalRequest",originalRequest);
    console.log("error.response?.status", error.response?.status);

    // ✅ check excluded routes first
    const excludedRoutes = ["/", "/signup", "/forgot-password", "/me"];
    const isExcluded = excludedRoutes.some((route) =>
      originalRequest.url.includes(route),
    );
    if (isExcluded) return Promise.reject(error);

    // then handle 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/refresh-token");
        if (res.status === 200) {
          return api(originalRequest);
        }
      } catch (err) {
        toast.error("Session ended, redirecting...");
        await api.post("/logout");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
