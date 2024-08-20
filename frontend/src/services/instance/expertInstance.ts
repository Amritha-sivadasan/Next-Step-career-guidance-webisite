import axios from "axios";
import { checkIfExpertIsBlocked } from "../api/ExpertApi";
import { setExpertAuthenticated } from "../../features/expert/expertAuthSlice";

const API_URL = process.env.VITE_API_URL;
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

//request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const isUserAllowed = await checkIfExpertIsBlocked();
  console.log("isUserAllowed", isUserAllowed);

  if (!isUserAllowed.data.is_active) {
    setExpertAuthenticated(false);
    localStorage.removeItem("expertAccess");
    localStorage.removeItem("expertId");
    localStorage.removeItem("expertAuth");
    window.location.replace("/expert/login");
    return Promise.reject("User is blocked");
  }

  const token = localStorage.getItem("expertAccess");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // console.log(error.response.status, "----------", originalRequest, "--------", refreshToken);

    if (error.response.data.error === "User is blocked") {
      alert("You are blocked by admin...");
      window.location.href = "/expert/login";
      return Promise.reject(new Error("User is blocked"));
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      // console.log("from user axios.........");

      originalRequest._retry = true;
      try {
        const newAccessToken = await getNewAccessToken();
        // console.log(newAccessToken, "new access token from user axios");

        localStorage.setItem("expertAccess", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    // console.log("user error response interceptor");
    return Promise.reject(error);
  }
);

async function getNewAccessToken() {
  // send a POST request to your backend API with the refresh token
  const response = await axios.post(
    `${API_URL}/expert/refresh-token`,
    {},
    { withCredentials: true }
  );
  // console.log("response from refresh token route--------------------", response);

  return response.data.accessToken;
}
