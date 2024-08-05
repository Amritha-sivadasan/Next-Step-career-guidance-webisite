const TrustedService = () => {
  return (
    <div className="container mx-auto p-4 bg-[#F0F8FF] mt-14 rounded-2xl shadow-lg w-10/12">
      <h1 className="text-2xl text-[#0B2149] font-semibold text-center mb-12 ">
        Trusted Service
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center mb-5">
          <img
            src="/quality.png" // Replace with your image path
            alt="High-Quality Guidance"
            className="h-32 object-cover  "
          />
          <h2 className="text-lg text-[#0B2149]">High-Quality Guidance</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/personal.png" // Replace with your image path
            alt="Personalized Approach"
            className="h-32 object-cover  "
          />
          <h2 className="text-lg text-[#0B2149]">Personalized Approach</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/professional.png" // Replace with your image path
            alt="Professional Standards"
            className=" h-32 object-cover  "
          />
          <h2 className="text-lg text-[#0B2149]">Professional Standards</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/environment.png" // Replace with your image path
            alt="Customer Satisfaction"
            className="w-32 h-32 object-cover  "
          />
          <h2 className="text-lg text-[#0B2149]">Customer Satisfaction</h2>
        </div>
      </div>
    </div>
  );
};

export default TrustedService;
