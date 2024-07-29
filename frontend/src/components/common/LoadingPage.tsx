import React from 'react'

const LoadingPage = () => {
    return (
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute w-auto min-w-full min-h-full max-w-none"
        >
          <source src="path_to_your_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <h2 className="text-white text-4xl font-semibold">Loading...</h2>
          <p className="text-white mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  };
  
  export default LoadingPage;