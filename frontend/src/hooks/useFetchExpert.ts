import { useState, useEffect } from "react";

import { axiosInstance } from "../services/api/instance/expertInstance";
import { IExpert } from "../@types/expert";

const API_URL = process.env.VITE_API_URL;

const useFetchExpertData = () => {
  const [expert, setExpert] = useState<IExpert | null>(null);
  const [isAuthenticated, setExpertAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/expert`, {
          withCredentials: true,
        });
        setExpert(response.data.data);
        setExpertAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setExpertAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  return { expert, isAuthenticated };
};

export default useFetchExpertData;
