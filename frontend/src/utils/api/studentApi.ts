import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const sendOtp = async (email: string) => {
  const response = await axios.post(`${apiUrl}/student/otp-send`, { email });
  return response.data;
};

export const firebaseLogin = async(token:string)=>{
  try {
    const response= await  axios.post(`${apiUrl}/student/firebase-login`,{token})
    return response.data
  } catch (error) {
      console.log('Error occur in firebase login',error);
      
  }
};
