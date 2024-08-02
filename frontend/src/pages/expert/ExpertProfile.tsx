import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useTypeSelector";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { IExpert } from "../../@types/expert";
import { upadateExpert } from "../../services/api/ExpertApi";
import { setExpert } from "../../features/expert/expertAuthSlice";
import { toast } from "react-toastify";
// import { updateExpert } from "../../store/actions/expertActions";

const ExpertProfile: React.FC = () => {
  const { expert } = useAppSelector((state) => state.expert);

  const [isEditing, setIsEditing] = useState({
    user_name: false,
    email: false,
    phoneNumber: false,
    personal_bio: false,
    area_of_expertise: false,
    consultation_fee: false,
    educationBackground: false,
    sub_category_id: false,
    credential: false,
  });

  const [formData, setFormData] = useState<Partial<IExpert>>({ ...expert });
  const [credentialUrl, setCredentialUrl] = useState<string | undefined>(
    undefined
  );

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
    const dataToSend: Partial<IExpert> = { [field]: formData[field] };
    setIsEditing({
      ...isEditing,
      [field]: false,
    });
    console.log("data to send", dataToSend);

    if (expert && expert._id) {
      const response = await upadateExpert(expert._id, dataToSend);
      if (response.success) {
        console.log("response", response);
        toast("Updation successfull");
        const result= await setExpert(response.data);
        setFormData({ ...result.payload });
        setCredentialUrl(response.data.credential);
   console.log('rsult',result)
        
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <div className="min-h-screen p-4 ms-12 w-11/12 flex justify-center">
      {expert ? (
        <div className="container mx-auto bg-white p-6 rounded-lg border shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Expert Details
          </h1>
          {typeof formData.profile_picture === "string" && (
            <img
              src={formData.profile_picture}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Username:</h2>
                {isEditing.user_name ? (
                  <>
                    <div className="flex gap-8">
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
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
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

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Email:</h2>
                {isEditing.email ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("email")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("email")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("email")}
                  />
                )}
              </div>
              {isEditing.email ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Phone Number:</h2>
                {isEditing.phoneNumber ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("phoneNumber")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("phoneNumber")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
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

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Personal Bio:</h2>
                {isEditing.personal_bio ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("personal_bio")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("personal_bio")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
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

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Area of Expertise:</h2>
                {isEditing.area_of_expertise ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("area_of_expertise")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("area_of_expertise")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
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

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Consultation Fee:</h2>
                {isEditing.consultation_fee ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("consultation_fee")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("consultation_fee")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("consultation_fee")}
                  />
                )}
              </div>
              {isEditing.consultation_fee ? (
                <input
                  type="number"
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

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Education Background:</h2>
                {isEditing.educationBackground ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("educationBackground")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("educationBackground")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
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

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Sub Category ID:</h2>
                {isEditing.sub_category_id ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("sub_category_id")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("sub_category_id")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
                    size={20}
                    color="gray"
                    onClick={() => handleEditClick("sub_category_id")}
                  />
                )}
              </div>
              {isEditing.sub_category_id ? (
                <input
                  type="text"
                  name="sub_category_id"
                  value={formData.sub_category_id}
                  onChange={handleChange}
                  className="p-3 border rounded-lg shadow-md w-full border-black"
                />
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {expert.sub_category_id}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <h2 className="font-semibold p-2">Credential:</h2>
                {isEditing.credential ? (
                  <>
                    <div className="flex gap-8">
                      <MdSave
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleSaveClick("credential")}
                      />
                      <MdCancel
                        className="mt-2 cursor-pointer"
                        size={24}
                        onClick={() => handleCancelClick("credential")}
                      />
                    </div>
                  </>
                ) : (
                  <MdEdit
                    className="mt-2 cursor-pointer"
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
                    onChange={handleFileChange}
                    className="p-3 border rounded-lg shadow-md w-full border-black"
                  />
                  <img
                    src={credentialUrl}
                    alt="Credential"
                    className="mt-2 w-full h-auto"
                  />
                </div>
              ) : (
                <p className="p-3 border rounded-lg shadow-md">
                  {typeof expert.credential == "string" ? (
                    <img src={expert.credential} alt="Credential" />
                  ) : (
                    "No credential uploaded"
                  )}
                </p>
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
