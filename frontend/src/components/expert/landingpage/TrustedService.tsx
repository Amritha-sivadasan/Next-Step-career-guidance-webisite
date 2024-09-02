import { useInView, motion } from "framer-motion";
import { useRef } from "react";

const TrustedService = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  return (
    <div
      ref={sectionRef}
      className="container mx-auto p-4 bg-[#F0F8FF] mt-14 rounded-2xl shadow-lg w-10/12"
    >
      <h1 className="text-2xl text-[#0B2149] font-semibold text-center mb-12">
        Trusted Service
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            src: "/quality.png",
            alt: "High-Quality Guidance",
            title: "High-Quality Guidance",
          },
          {
            src: "/personal.png",
            alt: "Personalized Approach",
            title: "Personalized Approach",
          },
          {
            src: "/professional.png",
            alt: "Professional Standards",
            title: "Professional Standards",
          },
          {
            src: "/environment.png",
            alt: "Customer Satisfaction",
            title: "Customer Satisfaction",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center mb-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <img src={item.src} alt={item.alt} className="h-32 object-cover" />
            <h2 className="text-lg text-[#0B2149]">{item.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrustedService;
