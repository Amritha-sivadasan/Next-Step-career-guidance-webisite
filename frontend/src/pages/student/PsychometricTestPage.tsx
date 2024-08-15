import { useEffect } from "react";
import PsychometricTest from "../../components/student/PsychometricTest/PsychometricTest";

const PsychometricTestPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-full">
      <PsychometricTest />
    </div>
  );
};

export default PsychometricTestPage;
