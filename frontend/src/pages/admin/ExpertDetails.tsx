// src/components/Experts.tsx
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage"; // Make sure you have a LoadingPage component
import { useNavigate } from "react-router-dom";
import { fetchAllExpert } from "../../services/api/categoryApi";

const Experts: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadExperts = async () => {
      try {
        const response = await fetchAllExpert();
        if (response.data) {
          setExperts(response.data);
        } else {
          toast.error(response.message || "Failed to fetch experts");
        }
      } catch (err) {
        toast.error("Failed to fetch experts");
      } finally {
        setLoading(false);
      }
    };

    loadExperts();
  }, []);

  const handleViewButton = (expertId: string) => {
    navigate(`/admin/expertView/${expertId}`);
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
    <main className="flex-1 p-6 bg-gray-100">
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="m-5 flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">Experts List</h1>
        </div>

        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2 border-b">No</th>
              <th className="py-2 border-b">Profile</th>
              <th className="py-2 border-b">Expert Name</th>
              <th className="py-2 border-b">SubCategory Name </th>
              <th className="py-2 border-b">Email Id</th>
              <th className="py-2 border-b">Status</th>
              <th className="py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {experts.map((expert, index) => (
              <tr key={expert._id}>
                <td className="py-2 border-b text-center">{index + 1}</td>
                <td className="py-2 border-b text-center">
                  <img
                    src={expert.profile_picture}
                    alt="Profile"
                    className="h-10 w-10 rounded-full mx-auto"
                  />
                </td>
                <td className="py-2 border-b text-center">
                  {expert.user_name}
                </td>
                <td className="py-2 border-b text-center">
                  {expert.sub_category_id}
                </td>
                <td className="py-2 border-b text-center">{expert.email}</td>
                <td className="py-2 border-b text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      expert.is_credential_validate == "pending"
                        ? "bg-yellow-500"
                        : expert.is_credential_validate == "true"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {expert.is_credential_validate == "pending"
                      ? "Pending"
                      : expert.is_credential_validate == "true"
                      ? "Validate"
                      : "Rejected"}
                  </span>
                </td>
                <td className="py-2 border-b text-center">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() => handleViewButton(expert._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Experts;
