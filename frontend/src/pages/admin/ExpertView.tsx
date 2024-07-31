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
  const { expertId } = useParams();
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
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen  p-4 bg-gray-100">
      {expert ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Expert Details</h1>
          <img
            src={
              typeof expert.profile_picture === "string"
                ? expert.profile_picture
                : URL.createObjectURL(expert.profile_picture)
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="font-semibold">Username:</h2>
              <p>{expert.user_name}</p>
            </div>
            <div>
              <h2 className="font-semibold">Email:</h2>
              <p>{expert.email}</p>
            </div>
            <div>
              <h2 className="font-semibold">Phone Number:</h2>
              <p>{expert.phonenumber}</p>
            </div>
            <div>
              <h2 className="font-semibold">Personal Bio:</h2>
              <p>{expert.personal_bio}</p>
            </div>
            <div>
              <h2 className="font-semibold">Area of Expertise:</h2>
              <p>{expert.area_of_expertise}</p>
            </div>
            <div>
              <h2 className="font-semibold">Consultation Fee:</h2>
              <p>{expert.consultation_fee}</p>
            </div>
            <div>
              <h2 className="font-semibold">Educational Background:</h2>
              <p>{expert.education_background}</p>
            </div>
            <div>
              <h2 className="font-semibold">Category:</h2>
              <p>{expert.sub_category_id}</p>
            </div>
            <div>
              <h2 className="font-semibold">Active Status:</h2>
              <p>{expert.is_active ? "Active" : "Inactive"}</p>
            </div>
          </div>
          {expert.is_credential_validate ? (
            <></>
          ) : (
            <button
              onClick={handleVerifyExpert}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Verify Expert
            </button>
          )}
        </div>
      ) : (
        <p className="text-center">Expert not found</p>
      )}
    </div>
  );
};

export default ExpertDetailsView;
