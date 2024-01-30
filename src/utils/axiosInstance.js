// utils/axiosInstance.js
import axios from "axios";
import { useRouter } from "next/navigation";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error status is 403 (Forbidden)
    if (error.response && error.response.status === 403) {
      // Prompt the user to log in again for security reasons
      alert("Session expired! Please log in again to refresh your session.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
