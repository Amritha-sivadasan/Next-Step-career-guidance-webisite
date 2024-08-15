import { useEffect } from "react";
import PsychometricTestResult from "../../components/student/PsychometricTest/PsychometricTestResult";

const PsychometricTestResultPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-screen max-w-screen-md">
      <PsychometricTestResult />
    </div>
  );
};

export default PsychometricTestResultPage;
