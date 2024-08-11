import { useState, ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypeSelector";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import {
  logoutStudent,
  updatePersonalInfo,
  uploadImage,
} from "../../../services/api/studentApi";
import { logout, setUser } from "../../../features/student/authSlice";
import { IStudent } from "../../../@types/user";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isEditingPersonal, setIsEditingPersonal] = useState<boolean>(false);
  const [isEditingEducation, setIsEditingEducation] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>(
    user?.profile_picture || "/dummyprofile.jpg"
  );

  const [personalInfo, setPersonalInfo] = useState<Partial<IStudent>>({});
  const [educationInfo, setEducationInfo] = useState<Partial<IStudent>>({});

  // useForm hooks
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errorsPersonal },
    reset: resetPersonal,
  } = useForm({
    defaultValues: {
      user_name: user?.user_name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const {
    register: registerEducation,
    handleSubmit: handleSubmitEducation,
    formState: { errors: errorsEducation },
    reset: resetEducation,
  } = useForm({
    defaultValues: {
      user_type: user?.user_type || "",
      education_background: user?.education_background || "",
      education_level: user?.education_level || "",
    },
  });

  useEffect(() => {
    if (user) {
      resetPersonal({
        user_name: user.user_name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      resetEducation({
        user_type: user.user_type || "",
        education_background: user.education_background || "",
        education_level: user.education_level || "",
      });
      setPreviewImage(user?.profile_picture);
      setPersonalInfo({
        user_name: user.user_name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      setEducationInfo({
        user_type: user.user_type || "",
        education_background: user.education_background || "",
        education_level: user.education_level || "",
      });
    }
  }, [user, resetPersonal, resetEducation]);

  const toggleEditPersonal = () => setIsEditingPersonal((prev) => !prev);
  const toggleEditEducation = () => setIsEditingEducation((prev) => !prev);

  const handleSavePersonal = async (data: Partial<IStudent>) => {
    try {
      setPersonalInfo(data);
      const response = await updatePersonalInfo(data);
      console.log("response", response);
      setIsEditingPersonal(false);
    } catch (error) {
      console.error("Error updating personal information", error);
    }
  };

  const handleSaveEducation = async (data: Partial<IStudent>) => {
    try {
      setEducationInfo(data);
      const response = await updatePersonalInfo(data);
      console.log("response", response);
      setIsEditingEducation(false);
    } catch (error) {
      console.error("Error updating education information", error);
    }
  };

  const handleCancelEditPersonal = () => {
    setIsEditingPersonal(false);
    resetPersonal({
      user_name: user?.user_name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
  };

  const handleCancelEditEducation = () => {
    setIsEditingEducation(false);
    resetEducation({
      user_type: user?.user_type || "",
      education_background: user?.education_background || "",
      education_level: user?.education_level || "",
    });
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      handleUploadProfilePicture(file);
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById(
      "profilePictureInput"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleUploadProfilePicture = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("profile_picture", file);
    try {
      const response = await uploadImage(formData);
      dispatch(setUser(response.data));
    } catch (error) {
      console.error("Error uploading profile picture", error);
    } finally {
      setUploading(false);
    }
  };
  const handleLogout = async () => {
    const response = await logoutStudent();
    if (response.success) {
      localStorage.removeItem("userAuth");
      localStorage.removeItem("userId");
      localStorage.removeItem("userAccess");
      navigate("/");
      dispatch(logout());
    }
  };

  return (
    <div className="w-11/12 p-6 bg-white rounded-lg">
      <div className="relative bg-[#0B2149] border h-40 rounded-2xl mb-8 shadow-md">
        <h1 className="text-3xl text-white font-bold mt-10 text-center">
          Your Profile
        </h1>
        <div className="flex justify-end me-11 ">
          {" "}
          <button onClick={handleLogout} className="bg-white p-2 rounded-lg ">
            Logout
          </button>
        </div>
      </div>
      <div className="relative -mt-32 flex justify-start ms-32 w-1/4">
        <div className="relative flex justify-center items-center">
          <img
            src={previewImage}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-2 border-white shadow-lg cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
            id="profilePictureInput"
          />
          {uploading && (
            <div className="absolute bottom-2 right-2 bg-gray-500 text-white p-2 rounded-full shadow-lg">
              Uploading...
            </div>
          )}
        </div>
      </div>
      <div className="border p-4 rounded-lg mt-24">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side */}
          <div className="flex-1">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Personal Information</h2>
                <button
                  onClick={toggleEditPersonal}
                  className="text-blue-500 hover:underline"
                >
                  <FaEdit color="#0B2149" />
                </button>
              </div>
              {isEditingPersonal ? (
                <div className="mt-8 border p-5 rounded-lg shadow-lg">
                  <form onSubmit={handleSubmitPersonal(handleSavePersonal)}>
                    <label className="block mb-2">
                      Name:
                      <input
                        type="text"
                        {...registerPersonal("user_name", {
                          required: "Name is required",
                          validate: {
                            noSpaces: (value) => {
                              return (
                                value.trim().length > 0 ||
                                "Name cannot be just spaces"
                              );
                            },
                          },
                        })}
                        className="block w-full mt-1 p-2 border rounded bg-[#F0F8FF]"
                      />
                      {errorsPersonal.user_name && (
                        <p className="text-red-500">
                          {errorsPersonal.user_name.message}
                        </p>
                      )}
                    </label>

                    <label className="block mb-2">
                      Phone:
                      <input
                        type="tel"
                        {...registerPersonal("phoneNumber", {
                          required: "Phone number is required",
                          validate: {
                            noSpaces: (value) => {
                              return (
                                value.trim().length > 0 ||
                                "Name cannot be just spaces"
                              );
                            },
                          },
                        })}
                        className="block w-full mt-1 p-2 border rounded bg-[#F0F8FF]"
                      />
                      {errorsPersonal.phoneNumber && (
                        <p className="text-red-500">
                          {errorsPersonal.phoneNumber.message}
                        </p>
                      )}
                    </label>

                    <div className="flex gap-4 mt-4">
                      <button
                        type="submit"
                        className="bg-blue-900 text-white p-2 w-24 h-10 rounded-lg flex gap-2 items-center"
                      >
                        <FaSave /> Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEditPersonal}
                        className="bg-gray-500 text-white p-2 w-24 h-10 rounded-lg flex gap-2 items-center"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="mt-8 border p-5 rounded-lg shadow-lg">
                  <p className="text-gray-700 mb-2">
                    Name:{" "}
                    <span className="font-semibold">
                      {personalInfo.user_name}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    Email:{" "}
                    <span className="font-semibold">{personalInfo.email}</span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    Phone:{" "}
                    <span className="font-semibold">
                      {personalInfo.phoneNumber}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl">Education Information</h2>
                <button
                  onClick={toggleEditEducation}
                  className="text-blue-500 hover:underline"
                >
                  <FaEdit color="#0B2149" />
                </button>
              </div>
              {isEditingEducation ? (
                <div className="mt-8 border p-5 rounded-lg shadow-lg">
                  <form onSubmit={handleSubmitEducation(handleSaveEducation)}>
                    <label className="block mb-2">
                      User Type:
                      <select
                        className=" w-full mt-1 p-2 border rounded bg-[#F0F8FF]"
                        {...registerEducation("user_type", {
                          required: "User type is required",
                        })}
                      >
                        <option value="">Select...</option>
                        <option value="Student">Student</option>
                        <option value="Working">Working</option>
                        <option value="Other">Other</option>
                      </select>
                      {errorsEducation.user_type && (
                        <p className="text-red-500">
                          {errorsEducation.user_type.message}
                        </p>
                      )}
                    </label>

                    <label className="block mb-2">
                      Education Background:
                      <input
                        type="text"
                        {...registerEducation("education_background", {
                          required: "Education background is required",
                          validate: {
                            noSpaces: (value) => {
                              return (
                                value.trim().length > 0 ||
                                "Please enter valid value"
                              );
                            },
                          },
                        })}
                        className="block w-full mt-1 p-2 border rounded bg-[#F0F8FF]"
                      />
                      {errorsEducation.education_background && (
                        <p className="text-red-500">
                          {errorsEducation.education_background.message}
                        </p>
                      )}
                    </label>

                    <label className="block mb-2">
                      Education Level:
                      <input
                        type="text"
                        {...registerEducation("education_level", {
                          required: "Education level is required",
                          validate: {
                            noSpaces: (value) => {
                              return (
                                value.trim().length > 0 ||
                                "Please enter valid value"
                              );
                            },
                          },
                        })}
                        className="block w-full mt-1 p-2 border rounded bg-[#F0F8FF]"
                      />
                      {errorsEducation.education_level && (
                        <p className="text-red-500">
                          {errorsEducation.education_level.message}
                        </p>
                      )}
                    </label>

                    <div className="flex gap-4 mt-4">
                      <button
                        type="submit"
                        className="bg-blue-900 text-white p-2 w-24 h-10 rounded-lg flex gap-2 items-center"
                      >
                        <FaSave /> Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEditEducation}
                        className="bg-gray-500 text-white p-2 w-24 h-10 rounded-lg flex gap-2 items-center"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="mt-8 border p-5 rounded-lg shadow-lg">
                  <p className="text-gray-700 mb-2">
                    User Type:{" "}
                    <span className="font-semibold">
                      {educationInfo.user_type}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    Education Background:{" "}
                    <span className="font-semibold">
                      {educationInfo.education_background}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    Education Level:{" "}
                    <span className="font-semibold">
                      {educationInfo.education_level}
                    </span>
                  </p>
                </div>
              )}
              <div className="border mt-4 rounded-lg p-5 shadow-lg flex flex-col items-center gap-4">
                <p className="font-semibold">
                  Click here to start chatting with your mentor!
                </p>
                <div className="flex gap-5">
                  <img src="/chat.png" alt="Chat" className="w-15 h-10" />
                  <button className="bg-[#0B2149] text-white p-1 rounded-xl w-20">
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
