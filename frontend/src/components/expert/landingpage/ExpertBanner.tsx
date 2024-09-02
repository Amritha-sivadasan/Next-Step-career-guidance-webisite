import { motion } from "framer-motion";

const ExpertBanner = () => {
  return (
    <section className="bg-[#0B2149] text-white h-[80vh] py-20 rounded-b-3xl flex flex-col md:flex-row items-center mt-12">
      <div
        className="container mx-auto px-4 flex flex-col md:flex-row items-center"
      
      >
        {/* Text Section */}
        <motion.div className="md:w-3/4 w-full text-center  md:text-left mb-8 md:mb-0"   initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}>
          <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">
            Unlocking potential through mentorship.
          </h1>
          <p className="text-base md:text-lg mb-6 md:mb-8">
            Unlock the potential of tomorrow's leaders through mentorship. Join
            our platform to share your industry expertise and guide aspiring
            students toward successful careers. Together, we empower the next
            generation of professionals
          </p>
          <button className="bg-white text-blue-900 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold">
            Get Started
          </button>
        </motion.div>

        {/* Image Section */}
        <motion.div className="md:w-2/4 w-full flex justify-center md:justify-end hidden md:flex"   initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}>
          <img
            src="/expertBanner.png"
            alt="Banner Image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertBanner;
