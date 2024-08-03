import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchExpertDetailsById,
  verifyExpert,
} from "../../../services/api/adminApi";
import LoadingPage from "../../common/LoadingPage";
import { IExpert } from "../../../@types/expert";

import { rejectExpert } from "../../../services/api/adminApi";

const ExpertDetailsView: React.FC = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const [expert, setExpert] = useState<IExpert | null>(null);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
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

  const handleRejectExpert = async () => {
    if (!expertId || !rejectionReason.trim()) return;
    setLoading(true);
    try {
      const result = await rejectExpert(expertId, rejectionReason);
      if (result.success) {
        console.log(result);
        toast.success("Expert rejected successfully");
        navigate("/admin/experts");
      }
    } catch (error) {
      toast.error("Failed to reject expert");
    } finally {
      setLoading(false);
      setShowRejectForm(false);
      setRejectionReason("");
    }
  };

  const handleCancelReject = () => {
    setShowRejectForm(false);
    setRejectionReason("");
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
    <div className="min-h-screen p-4 lg:ms-12 sm:mx-auto md:w-8/12 lg:w-8/12 sm:w-full flex justify-center">
      {expert ? (
        <div className="container mx-auto bg-white p-6 rounded-lg border shadow-md sm:w-full ">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 mb-6">
            <button
              onClick={handleVerifyExpert}
              className="bg-[#0B2149] text-white px-6 py-2 rounded-lg hover:bg-[#0a1d34] transition-colors duration-300"
            >
              Verify Expert
            </button>
            <button
              onClick={() => setShowRejectForm(true)}
              className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Reject
            </button>
          </div>
          {showRejectForm && (
            <div className="bg-white p-6 rounded-lg border shadow-md mt-6">
              <h2 className="text-lg font-semibold mb-4">Rejection Reason</h2>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="w-full p-2 bg-[#E8EFFA] border rounded-lg mb-4"
                placeholder="Enter the rejection reason"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleRejectExpert}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Send
                </button>
                <button
                  onClick={handleCancelReject}
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
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
