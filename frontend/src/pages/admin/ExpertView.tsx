import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchExpertDetailsById,
  verifyExpert,
} from "../../services/api/adminApi";
import LoadingPage from "../../components/common/LoadingPage";
import { IExpert } from "../../@types/expert";

const ExpertDetailsView: React.FC = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const [expert, setExpert] = useState<IExpert | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getExpertDetails = async () => {
      try {
        if (expertId) {
          const response = await fetchExpertDetailsById(expertId);
          setExpert(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch expert details");
      } finally {
        setLoading(false);
      }
    };

    if (expertId) {
      getExpertDetails();
    }
  }, [expertId]);

  const handleVerifyExpert = async () => {
    if (!expertId) return;

    setLoading(true);
    try {
      const result = await verifyExpert(expertId);
      if (result.success) {
        toast.success("Expert verified successfully");
        navigate("/admin/experts");
      }
    } catch (error) {
      toast.error("Failed to verify expert");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-w-screen w-full">
        {" "}
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 ms-12  w-8/12 flex justify-center">
      {expert ? (
        <div className="container mx-auto bg-white p-6 rounded-lg border shadow-md ">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Expert Details
          </h1>
          <img
            src={
              typeof expert.profile_picture === "string"
                ? expert.profile_picture
                : URL.createObjectURL(expert.profile_picture)
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <div className="grid grid-cols  gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
            <div className=" ">
              <h2 className="font-semibold p-2">Username:-</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.user_name}
              </p>
            </div>
            <div>
              <h2 className="font-semibold p-2">Email:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.email}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Phone Number:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.phoneNumber}
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold">Personal Bio:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.personal_bio}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Area of Expertise:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.area_of_expertise}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Consultation Fee:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.consultation_fee}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Educational Background:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.educationBackground}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Category:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.sub_category_id}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Active Status:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {expert.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
          <div className="w-full min-h-10">
            <h2 className="font-semibold">Credential:</h2>
            {typeof expert.credential === "string" ? (
              <img
                src={expert.credential}
                alt="Credential"
                className="w-full h-auto object-cover rounded-lg mt-2"
              />
            ) : (
              <img
                src={URL.createObjectURL(expert.credential)}
                alt="Credential"
                className="w-full h-auto object-cover rounded-lg mt-2"
              />
            )}
          </div>
          {!expert.is_credential_validate && (
            <div className="text-center">
              <button
                onClick={handleVerifyExpert}
                className="mt-6 bg-[#0B2149] text-white px-6 py-2 rounded-lg hover: transition-colors duration-300"
              >
                Verify Expert
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center">Expert not found</p>
      )}
    </div>
  );
};

export default ExpertDetailsView;
