import axios, { CancelTokenSource } from "axios";
import { checkIfUserIsBlocked } from "../api/studentApi";
import { setAuthenticated } from "../../features/student/authSlice";

const API_URL = import.meta.env.VITE_API_URL;
export const studentAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let cancelTokenSource: CancelTokenSource | null;

studentAxiosInstance.interceptors.request.use(async (config) => {
  if (cancelTokenSource) {
    console.log('cancelTokenSource',cancelTokenSource);
    cancelTokenSource.cancel("Operation canceled due to a new request.");
    cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;
  }

  const isUserAllowed = await checkIfUserIsBlocked();
  if (!isUserAllowed.data.is_active) {
    setAuthenticated(false);
    localStorage.removeItem("userAuth");
    localStorage.removeItem("userId");
    localStorage.removeItem("userAccess");
    window.location.replace("/login");
    return Promise.reject("User is blocked");
  }

  const token = localStorage.getItem("userAccess");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//response interceptor
studentAxiosInstance.interceptors.response.use(
  (response) => {
    cancelTokenSource = null;
    return response;
  },
  async (error) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message, error);
      return Promise.reject(error);
    }
    const originalRequest = error.config;

    // console.log(error.response.status, "----------", originalRequest, "--------", refreshToken);

    if (error.response.data.error === "User is blocked") {
      alert("You are blocked by admin...");
      window.location.href = "/login";
      return Promise.reject(new Error("User is blocked"));
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      // console.log("from user axios.........");

      originalRequest._retry = true;
      try {
        const newAccessToken = await getNewAccessToken();
        // console.log(newAccessToken, "new access token from user axios");

        localStorage.setItem("userAccess", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return studentAxiosInstance(originalRequest);
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
    `${API_URL}/student/refresh-token`,
    {},
    { withCredentials: true }
  );
  // console.log("response from refresh token route--------------------", response);

  return response.data.accessToken;
}
