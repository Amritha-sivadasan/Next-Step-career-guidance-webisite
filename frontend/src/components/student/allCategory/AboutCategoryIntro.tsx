const AboutCategoryIntro = () => {
  return (
    <section className="bg-[#0B2149] lg:h-[55vh] sm:h-auto text-white py-20 md:py-20  flex flex-col md:flex-row items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-3/4 w-full text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">
            Introduction to software development
          </h1>
          <p className="text-base md:text-lg mb-6 md:mb-8">
            The software industry involves creating, maintaining, and
            distributing software products and services. It includes developing
            applications, systems, and tools for various sectors, enhancing
            efficiency and innovation. The industry ranges from startups to
            global tech companies. Our experts will help you choose your better
            future.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-7/12 sm:w-2/12 lg:w-5/12 flex justify-center md:justify-end">
          <div className="w-full md:w-2/4 lg:w-3/5 flex justify-center">
            <img
              src="/intro.png"
              alt="Banner Image"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCategoryIntro;
