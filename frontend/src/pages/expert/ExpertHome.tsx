import { useNavigate } from "react-router-dom";

const ExpertHome = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/expert/profile");
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Expert Home Page
        </h1>
        <div className="flex justify-center">
          <button
            onClick={handleButton}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertHome;
