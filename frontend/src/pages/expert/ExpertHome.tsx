import { useNavigate } from "react-router-dom";
import { logoutExpert } from "../../services/api/ExpertApi";
import { useDispatch } from "react-redux";
import { setExpertAuthenticated } from "../../features/expert/expertAuthSlice";

const ExpertHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButton = () => {
    navigate("/expert/profile");
  };
  const handleLogout = async () => {
    const response = await logoutExpert();
    if (response.success) {
      localStorage.removeItem("expertAccess");
      localStorage.removeItem('expertId')
      dispatch(setExpertAuthenticated(false));
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Expert Home Page
        </h1>
        <div className="flex space-x-6 justify-center">
          <button
            onClick={handleButton}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertHome;
