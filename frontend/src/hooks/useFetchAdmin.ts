import { useState, useEffect } from "react";


const useFetchAdminData = () => {
  const [admin, setAdmin] = useState<string | null>(null);
  const [isAuthenticated, setadminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response= localStorage.getItem('adminName')
        if (response) {
            setAdmin(response);
            setadminAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setadminAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  return { admin, isAuthenticated };
};

export default useFetchAdminData;
