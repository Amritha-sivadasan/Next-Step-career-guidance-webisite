import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginAdmin, LoginResponseAdmin } from "../../features/admin/middleware/adminLoginThunk";
// import { setAdmin } from "../../features/admin/adminSlice";

interface LoginFormInputs {
  user_name: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const response = await dispatch(LoginAdmin(data));
    console.log(response.payload);
    
    if (response.payload?.success && response.payload.data) {
      const payload = response.payload as LoginResponseAdmin;
       localStorage.setItem('adminAccess',payload.accessToken)
       if(payload.data){
        localStorage.setItem('adminName',payload.data)
       }
        if (response.payload?.success) {
          navigate("/admin");
        }
      
      
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex-1 flex items-center justify-center p-4 bg-white relative">
        <div className="absolute top-6 left-8 flex items-center">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
        </div>

        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Log in
          </h1>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("user_name", {
                required: "User Name is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: "Invalid username format",
                },
              })}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Enter your User Name"
            />
            {errors.user_name && (
              <p className="text-red-500 text-sm">{errors.user_name.message}</p>
            )}

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex-1 md:flex items-center justify-center p-4 bg-white">
        <img
          src="/admin.png"
          alt="Description of Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
