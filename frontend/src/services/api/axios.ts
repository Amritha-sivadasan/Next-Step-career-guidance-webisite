import axios from "axios";
// import { checkIfUserIsBlocked } from "./studentApi";

const API_URL = process.env.VITE_API_URL;
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', 
},
withCredentials: true,
});

//request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  // const isUserAllowed = await checkIfUserIsBlocked();

  // if (!isUserAllowed) {
  //   window.location.href = "/";
  //   return Promise.reject("user is blocked");
  // }

  const token = localStorage.getItem("userAccess");
  // console.log('log from request user api', token);

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
    const refreshToken = localStorage.getItem("userRefresh");
    // console.log(error.response.status, "----------", originalRequest, "--------", refreshToken);

    if (error.response.data.error === "User is blocked") {
      alert("You are blocked by admin...");
      window.location.href = "/login";
      return Promise.reject(new Error("User is blocked"));
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      // console.log("from user axios.........");

      originalRequest._retry = true;
      try {
        const newAccessToken = await getNewAccessToken(refreshToken);
        // console.log(newAccessToken, "new access token from user axios");

        localStorage.setItem("userAccess", newAccessToken);
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

async function getNewAccessToken(refreshToken: string) {
  // send a POST request to your backend API with the refresh token
  const response = await axiosInstance.post(
    `${API_URL}/refresh-token`,
    { refreshToken },
    { withCredentials: true }
  );
  // console.log("response from refresh token route--------------------", response);

  return response.data.accessToken;
}
