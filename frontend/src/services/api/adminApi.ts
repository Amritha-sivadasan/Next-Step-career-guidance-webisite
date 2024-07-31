import axios from "axios";
import { adminAxiosInstance } from "../instance/adminInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const adminLogin = async (userName: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/login`,
      { userName, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const addCategory = async (data: FormData) => {
  try {
    const response = await adminAxiosInstance.post(
      `${API_URL}/admin/addCategory`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchAllCategories = async () => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/allCategory`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/deleteCategory/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchCategoryById = async (id: string) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/categoryById/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const updateCategory = async (id: string, data: FormData) => {
  try {
 
    const response = await adminAxiosInstance.put(
      `${API_URL}/admin/editCategory/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};

////------------------Subcategory----------------//

export const addSubCategory = async (data: FormData) => {
  try {
   
    const response = await adminAxiosInstance.post(
      `${API_URL}/admin/addSubCategory`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchAllSubCategories = async () => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/allSubCategory`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const deleteSubCategory = async (id: string) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/deleteSubCategory/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchSubCategoryById = async (id: string) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/subCategoryById/${id}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const updateSubCategory = async (id: string, data: FormData) => {
  try {
    const response = await adminAxiosInstance.put(
      `${API_URL}/admin/editSubCategory/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};
