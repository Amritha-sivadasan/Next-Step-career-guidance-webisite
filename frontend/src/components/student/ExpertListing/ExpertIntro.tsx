const ExpertIntro = () => {
  return (
    <section className="bg-[#0B2149] lg:h-[45vh] sm:h-auto text-white py-20 md:py-20  flex flex-col md:flex-row items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-3/4 w-full text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-xl md:text-3xl font-semibold mb-6 md:mb-10">
            Empower Your Future: Select the Perfect Mentor Now!
          </h1>
        </div>

        {/* Image Section */}
        <div className="md:w-7/12 sm:w-2/12 lg:w-5/12 flex justify-center md:justify-end">
          <div className="w-full md:w-2/4 lg:w-3/5 flex justify-center">
            <img
              src="/expertIntro.png"
              alt="Banner Image"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertIntro;
