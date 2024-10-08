import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const naviagate= useNavigate()

  const handleHomepage= ()=>{
     naviagate('/')
  }
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200 relative">
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg className="w-48 h-48" viewBox="0 0 100 100">
                <rect x="10" y="20" width="80" height="60" rx="10" fill="#4263EB" />
                <circle cx="35" cy="40" r="5" fill="#FFA500" />
                <circle cx="65" cy="40" r="5" fill="#FFA500" />
                <rect x="40" y="60" width="20" height="5" fill="white" />
                <path d="M30 80 L40 70 L60 70 L70 80" stroke="#4263EB" strokeWidth="4" fill="none" />
                <circle cx="85" cy="25" r="3" fill="#FF6B6B" />
                <path d="M85 22 Q87 20 89 22" stroke="#FF6B6B" strokeWidth="2" fill="none" />
              </svg>
            </span>
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-600 mt-4">404 ERROR PAGE</h2>
          <p className="text-gray-500 mt-2">uh-oh! Nothing here...</p>
          <button onClick={handleHomepage} className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
            GO BACK HOME
          </button>
        </div>
      </div>
    );
  };
  
  export default NotFound;