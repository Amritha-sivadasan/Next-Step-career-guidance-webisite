import { useParams } from "react-router-dom";
import StudentDetailView from "../../components/admin/student/StudentDetailView";
import { useEffect, useState } from "react";
import { IStudent } from "../../@types/user";
import { fetchStudentDetailsById } from "../../services/api/adminApi";

const StudentSingleView = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<IStudent | null>(null);
  useEffect(() => {
    const getExpertDetails = async () => {
      if (studentId) {
        const response = await fetchStudentDetailsById(studentId);

        setStudent(response.data);
      }
    };

    if (studentId) {
      getExpertDetails();
    }
  }, [studentId]);
  return (
    <div className="w-full  ">
      <StudentDetailView student={student} />
    </div>
  );
};

export default StudentSingleView;
