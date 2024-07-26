import { useState, useEffect } from "react";

import { axiosInstance } from "../services/api/axios";
import { IStudent } from "../@types/user";

const API_URL = process.env.VITE_API_URL;

const useFetchUserData = () => {
  const [user, setUser] = useState<IStudent | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/student`, {
          withCredentials: true,
        });

        setUser(response.data.data);
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
