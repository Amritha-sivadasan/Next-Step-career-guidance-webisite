import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const sendOtp = async (email: string) => {
    const response = await axios.post(`${apiUrl}/student/otp-send`, { email });
    return response.data;
  };