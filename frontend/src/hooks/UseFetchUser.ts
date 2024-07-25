import { useState, useEffect } from "react";
import { UserData } from "../features/student/authSlice";
import { axiosInstance } from "../services/api/axios";

const API_URL = process.env.VITE_API_URL;

const useFetchUserData = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/student`, {
          withCredentials: true,
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, isAuthenticated };
};

export default useFetchUserData;
