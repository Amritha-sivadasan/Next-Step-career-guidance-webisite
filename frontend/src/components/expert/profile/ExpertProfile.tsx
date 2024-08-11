import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { IExpert } from "../../../@types/expert";
import {
  fetchAllSubCategoriesExpert,
  upadateExpert,
  uploadExpertImage,
} from "../../../services/api/ExpertApi";
import { setExpert } from "../../../features/expert/expertAuthSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ISubCategory } from "../../../@types/dashboard";

const ExpertProfile: React.FC = () => {
  const { expert } = useAppSelector((state) => state.expert);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState({
    user_name: false,
    email: false,
    phoneNumber: false,
    personal_bio: false,
    area_of_expertise: false,
    consultation_fee: false,
    educationBackground: false,
    subCatName: false,
    credential: false,
  });
  const [subCategory, setSubCateory] = useState<ISubCategory[]>([]);
  const [formData, setFormData] = useState<Partial<IExpert>>({ ...expert });
  const [credentialUrl, setCredentialUrl] = useState<string | undefined>(
    undefined
  );
  const [previewImage, setPreviewImage] = useState<string>(
    expert?.profile_picture || "/dummyprofile.jpg"
  );

  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadingCredential, setUploadingCredential] =
    useState<boolean>(false);
  useEffect(() => {
    if (expert) {
      setFormData({ ...expert });
    }
  }, [expert]);

  useEffect(() => {
    if (formData.credential instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCredentialUrl(reader.result as string);
      };
      reader.readAsDataURL(formData.credential);
    } else {
      setCredentialUrl(formData.credential as string);
    }
  }, [formData.credential]);

  useEffect(() => {
    if (expert) {
      setPreviewImage(expert?.profile_picture);
      const fetchSubcat = async () => {
        const result = await fetchAllSubCategoriesExpert();
        setSubCateory(result.data.items);
      };
      fetchSubcat();
    }
  }, [expert]);

  const handleImageClick = () => {
    const fileInput = document.getElementById(
      "profilePictureInput"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      handleUploadProfilePicture(file);
    }
  };

  const handleUploadProfilePicture = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("profile_picture", file);
    try {
      const result = await uploadExpertImage(formData);
      dispatch(setExpert(result.data));
    } catch (error) {
      console.error("Error uploading profile picture", error);
    } finally {
      setUploading(false);
    }
  };
  const handleEditClick = (field: keyof typeof isEditing) => {
    setIsEditing({
      ...isEditing,
      [field]: true,
    });
  };

  const handleCancelClick = (field: keyof typeof isEditing) => {
    setIsEditing({
      ...isEditing,
      [field]: false,
    });
    setFormData({ ...expert });
  };

  const handleSaveClick = async (field: keyof typeof isEditing) => {
    setUploadingCredential(true);
    const dataToSend: Partial<IExpert> = { [field]: formData[field] };

    if (expert && expert._id) {
      const response = await upadateExpert(expert._id, dataToSend);
      if (response.success) {
        toast.success("Updation successfull");
        dispatch(setExpert(response.data));
        setFormData({ ...response.data });
        setCredentialUrl(response.data.credential);
      }
    }
    setIsEditing({
      ...isEditing,
      [field]: false,
    });

    setUploadingCredential(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        credential: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setCredentialUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 mx-auto w-full max-w-4xl flex justify-center">
      {expert ? (
        <div className="container mx-auto bg-white p-6 rounded-lg ">
          <div className="relative bg-[#F2F2F2] border h-40 rounded-lg mb-8 shadow-md">
            <h1 className="text-3xl font-bold mt-10 text-center">
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
          <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 p-5 rounded-lg border shadow-md">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Username:</h2>
                {isEditing.user_name ? (
                  <div className="flex gap-4">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("user_name")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("user_name")}
                    />
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("user_name")}
                  />
                )}
              </div>
              {isEditing.user_name ? (
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.user_name}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Email:</h2>
              </div>
              <p className="p-3 border rounded-lg shadow-md">{expert.email}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Phone Number:</h2>
                {isEditing.phoneNumber ? (
                  <div className="flex gap-4">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("phoneNumber")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("phoneNumber")}
                    />
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("phoneNumber")}
                  />
                )}
              </div>
              {isEditing.phoneNumber ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.phoneNumber}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Personal Bio:</h2>
                {isEditing.personal_bio ? (
                  <div className="flex gap-4">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("personal_bio")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("personal_bio")}
                    />
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("personal_bio")}
                  />
                )}
              </div>
              {isEditing.personal_bio ? (
                <textarea
                  name="personal_bio"
                  value={formData.personal_bio}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.personal_bio}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Area of Expertise:</h2>
                {isEditing.area_of_expertise ? (
                  <div className="flex gap-4">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("area_of_expertise")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("area_of_expertise")}
                    />
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("area_of_expertise")}
                  />
                )}
              </div>
              {isEditing.area_of_expertise ? (
                <input
                  type="text"
                  name="area_of_expertise"
                  value={formData.area_of_expertise}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.area_of_expertise}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Consultation Fee:</h2>
                {isEditing.consultation_fee ? (
                  <div className="flex gap-4">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("consultation_fee")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("consultation_fee")}
                    />
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("consultation_fee")}
                  />
                )}
              </div>
              {isEditing.consultation_fee ? (
                <input
                  type="text"
                  name="consultation_fee"
                  value={formData.consultation_fee}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.consultation_fee}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Education Background:</h2>
                {isEditing.educationBackground ? (
                  <div className="flex gap-4">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("educationBackground")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("educationBackground")}
                    />
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("educationBackground")}
                  />
                )}
              </div>
              {isEditing.educationBackground ? (
                <input
                  type="text"
                  name="educationBackground"
                  value={formData.educationBackground}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.educationBackground}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Sub Category Name:</h2>
                {isEditing.subCatName ? (
                  <div className="flex gap-4">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("subCatName")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("subCatName")}
                    />
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("subCatName")}
                  />
                )}
              </div>

              {isEditing.subCatName ? (
                <select
                  className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg"
                  value={formData.subCatName}
                  onChange={handleChange}
                  name="subCatName"
                >
                  {subCategory.map((category) => (
                    <option key={category._id} value={category.subCatName}>
                      {category.subCatName}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {formData.subCatName}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold p-2">Credential:</h2>
                {isEditing.credential ? (
                  <div className="flex gap-4 items-center">
                    <MdSave
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleSaveClick("credential")}
                    />
                    <MdCancel
                      className="cursor-pointer"
                      size={24}
                      onClick={() => handleCancelClick("credential")}
                    />
                    {uploadingCredential && (
                      <div className="relative bg-gray-500 text-white p-2 rounded-full shadow-lg">
                        Uploading...
                      </div>
                    )}
                  </div>
                ) : (
                  <MdEdit
                    className="cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("credential")}
                  />
                )}
              </div>
              {isEditing.credential ? (
                <div>
                  <input
                    type="file"
                    name="credential"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="p-3 border rounded-lg shadow-md w-full border-black"
                  />
                  {credentialUrl && (
                    <img
                      src={credentialUrl}
                      alt="Credential Preview"
                      className="mt-2 w-full h-auto border rounded-lg"
                    />
                  )}
                </div>
              ) : (
                <div className="p-3 border rounded-lg shadow-md">
                  {typeof expert.credential === "string" ? (
                    <img
                      src={expert.credential}
                      alt="Credential"
                      className="w-full h-auto"
                    />
                  ) : (
                    "No credential uploaded"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExpertProfile;
