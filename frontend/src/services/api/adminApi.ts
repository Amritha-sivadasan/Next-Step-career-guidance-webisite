 import axios  from "axios";
//  import { adminAxiosInstance } from "../instance/adminInstance";

 const API_URL = process.env.VITE_API_URL;


 interface Error {
    response?: {
      data?: {
        message: string;
      };
    };
  }

  export const adminLogin= async(userName:string,password:string)=>{
    try {
       const response=   await axios.post(`${API_URL}/admin/login`,{userName,password},{ withCredentials: true })  
        return response.data
    } catch (error) {
        return (error as Error).response?.data;
    }
  }
  