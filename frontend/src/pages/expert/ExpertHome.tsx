

const ExpertHome = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Expert Home Page
        </h1>
        <div className="flex space-x-6 justify-center">
          <button
         
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Profile
          </button>
          <button
           
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
