const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-pink-500 animate-[spin_1.5s_linear_infinite]"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-yellow-500 animate-[spin_2s_linear_infinite]"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-green-500 animate-[spin_2.5s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
