import axios from "axios";

const API_URL = process.env.VITE_API_URL;
export const adminAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

//request interceptor
adminAxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("adminAccess");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//response interceptor
adminAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // if (error.response.data.error === "User is blocked") {
    //   alert("You are blocked by admin...");
    //   window.location.href = "/expert/login";
    //   return Promise.reject(new Error("User is blocked"));
    // }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await getNewAccessToken();

        localStorage.setItem("adminAccess", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return adminAxiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

async function getNewAccessToken() {
  const response = await axios.post(
    `${API_URL}/admin/refresh-token`,
    {},
    { withCredentials: true }
  );
  // console.log("response from refresh token route--------------------", response);

  return response.data.accessToken;
}
