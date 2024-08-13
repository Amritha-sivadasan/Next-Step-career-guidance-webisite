import React, { useEffect, useState } from "react";
import LoadingPage from "../../common/Loading/LoadingPage";
import { IStudent } from "../../../@types/user";

interface StudentProbs {
  student: IStudent | null;
}

const StudentDetailView: React.FC<StudentProbs> = ({ student }) => {
  const [studentData, setstudentData] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setstudentData(student);
    setLoading(false);
  }, [student]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-w-screen w-full">
        {" "}
        <LoadingPage />
      </div>
    );
  }
  return (
    <div className="min-h-screen p-4  sm:mx-auto md:w-full lg:w-9/12 sm:w-full flex justify-center mb-8">
      {studentData ? (
        <div className="container  mx-auto bg-white p-6 rounded-lg border shadow-md sm:w-full ">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Student Details
          </h1>
          <img
            src={studentData.profile_picture}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <div className="grid grid-cols  gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
            <div className=" ">
              <h2 className="font-semibold p-2">Username:-</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {studentData.user_name}
              </p>
            </div>
            <div>
              <h2 className="font-semibold p-2">Email:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {studentData.email}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Phone Number:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {studentData.phoneNumber}
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold">Education Background</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {studentData.education_background}
              </p>
            </div>
            <div>
              <h2 className="font-semibold">Higher Education</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {studentData.education_level}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Current Status</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {studentData.user_type}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Active Status:</h2>
              <p className="p-3 border rounded-lg bg-[#E8EFFA]">
                {studentData.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Expert not found</p>
      )}
    </div>
  );
};

export default StudentDetailView;
