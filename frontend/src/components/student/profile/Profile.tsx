import { useState, ChangeEvent, useEffect } from "react";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";
import { uploadImage } from "../../../services/api/studentApi";
import { setUser } from "../../../features/student/authSlice";
import { IStudent } from "../../../@types/user";

const Profile = () => {
  const { user } = useAppSelector((state) => state.student);

  const [isEditingPersonal, setIsEditingPersonal] = useState<boolean>(false);
  const [isEditingEducation, setIsEditingEducation] = useState<boolean>(false);

  const [personalInfo, setPersonalInfo] = useState<Partial<IStudent>>({});
  const [educationInfo, setEducationInfo] = useState<Partial<IStudent>>({});

  const [uploading, setUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>(
    user?.profile_picture || "/dummyprofile.jpg"
  );

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        user_name: user.user_name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      setEducationInfo({
        user_type: user.user_type || "",
        education_background: user.education_background || "",
        education_level: user.education_level || "",
      })
      setPreviewImage(user?.profile_picture)
    }
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
    type: "personal" | "education"
  ) => {
    if (type === "personal") {
      setPersonalInfo((prev) => ({ ...prev, [field]: e.target.value }));
    } else {
      setEducationInfo((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const toggleEditPersonal = () => setIsEditingPersonal((prev) => !prev);
  const toggleEditEducation = () => setIsEditingEducation((prev) => !prev);

  const handleSavePersonal = async () => {
    try {
      await axios.post("/api/updatePersonalInfo", personalInfo);
      setIsEditingPersonal(false);
    } catch (error) {
      console.error("Error updating personal information", error);
    }
  };

  const handleSaveEducation = async () => {
    try {
      await axios.post("/api/updateEducationInfo", educationInfo);
      setIsEditingEducation(false);
    } catch (error) {
      console.error("Error updating education information", error);
    }
  };

  const handleCancelEditPersonal = () => {
    setIsEditingPersonal(false);
    setPersonalInfo({
      user_name: user?.user_name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
  };

  const handleCancelEditEducation = () => {
    setIsEditingEducation(false);
    setEducationInfo({
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
      console.log("response", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error uploading profile picture", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-11/12 p-6 bg-white rounded-lg">
     
          <div className="relative bg-[#0B2149] border h-40 rounded-2xl mb-8 shadow-md">
            <h1 className="text-3xl text-white font-bold mt-10 text-center">
              Your Profile
            </h1>
          </div>
          <div className="relative -mt-32 flex justify-start ms-32">
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
                      <FaEdit />
                    </button>
                  </div>
                  {isEditingPersonal ? (
                    <div className="mt-8 border p-5 rounded-lg shadow-lg">
                      <label className="block mb-2">
                        Name:
                        <input
                          type="text"
                          value={personalInfo.user_name}
                          onChange={(e) =>
                            handleInputChange(e, "name", "personal")
                          }
                          className="block w-full mt-1 p-2 border rounded"
                        />
                      </label>
                      <label className="block mb-2">
                        Email:
                        <input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) =>
                            handleInputChange(e, "email", "personal")
                          }
                          className="block w-full mt-1 p-2 border rounded"
                        />
                      </label>
                      <label className="block mb-2">
                        Phone:
                        <input
                          type="tel"
                          value={personalInfo.phoneNumber}
                          onChange={(e) =>
                            handleInputChange(e, "phone", "personal")
                          }
                          className="block w-full mt-1 p-2 border rounded"
                        />
                      </label>
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={handleSavePersonal}
                          className="bg-blue-500 text-white p-2 rounded-lg"
                        >
                          <FaSave /> Save
                        </button>
                        <button
                          onClick={handleCancelEditPersonal}
                          className="bg-gray-500 text-white p-2 rounded-lg"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
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
                        <span className="font-semibold">
                          {personalInfo.email}
                        </span>
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
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Education Details</h2>
                    <button
                      onClick={toggleEditEducation}
                      className="text-blue-500 hover:underline"
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {isEditingEducation ? (
                    <div className="border mt-4 rounded-lg p-5 shadow-lg">
                      <label className="block mb-2">
                        User Type:
                        <input
                          type="text"
                          value={educationInfo.user_type}
                          onChange={(e) =>
                            handleInputChange(e, "userType", "education")
                          }
                          className="block w-full mt-1 p-2 border rounded"
                        />
                      </label>
                      <label className="block mb-2">
                        Education Background:
                        <input
                          type="text"
                          value={educationInfo.education_background}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "educationBackground",
                              "education"
                            )
                          }
                          className="block w-full mt-1 p-2 border rounded"
                        />
                      </label>
                      <label className="block mb-2">
                        Education Level:
                        <input
                          type="text"
                          value={educationInfo.education_level}
                          onChange={(e) =>
                            handleInputChange(e, "educationLevel", "education")
                          }
                          className="block w-full mt-1 p-2 border rounded"
                        />
                      </label>
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={handleSaveEducation}
                          className="bg-blue-500 text-white p-2 rounded-lg"
                        >
                          <FaSave /> Save
                        </button>
                        <button
                          onClick={handleCancelEditEducation}
                          className="bg-gray-500 text-white p-2 rounded-lg"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border mt-4 rounded-lg p-5 shadow-lg">
                      <p className="text-gray-700 mb-2">
                        User Type:{" "}
                        <span className="font-semibold">
                          {educationInfo.user_type || "N/A"}
                        </span>
                      </p>
                      <p className="text-gray-700 mb-2">
                        Education Background:{" "}
                        <span className="font-semibold">
                          {educationInfo.education_background || "N/A"}
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
