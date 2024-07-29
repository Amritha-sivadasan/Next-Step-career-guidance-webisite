

const LoadingPage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
          <p className="text-lg font-semibold text-gray-600">Loading, please wait...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingPage;
