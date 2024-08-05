import React from "react";
import "../../../App.css";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Expert 1",
      feedback: "Feedback from expert 1",
      image: "/path/to/image1.jpg",
    },
    {
      name: "Expert 2",
      feedback: "Feedback from expert 2",
      image: "/path/to/image2.jpg",
    },
    {
      name: "Expert 3",
      feedback: "Feedback from expert 3",
      image: "/path/to/image3.jpg",
    },
  ];

  return (
    <section className="py-20 w-full">
      <div className="mx-auto text-center w-full">
        <div className="flex flex-col justify-center mb-24">
          <h3 className="text-[#0B2149]">Meet our popular Mentors</h3>
          <h2 className="text-3xl font-bold text-[#0B2149]">Our Experts</h2>
        </div>
        <div className="bg-[#F0F8FF]">
          {/* Horizontal Scrolling Container */}
          <div className="p-5  overflow-hidden">
            <div className="scroll-container">
              <div className="scroll-content flex space-x-12 mt-4">
                {" "}
                {/* Adjust space-x-* value for desired gap */}
                {/* Render the testimonials and their duplicates */}
                {[...testimonials, ...testimonials].map(
                  (testimonial, index) => (
                    <div
                      key={index}
                      className="scroll-item bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
                    >
                      {/* Image */}
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 object-cover mb-4 rounded-full"
                      />
                      {/* Feedback */}
                      <p className="italic mb-4 flex-grow">
                        "{testimonial.feedback}"
                      </p>
                      {/* Name */}
                      <div className="font-bold text-lg">
                        {testimonial.name}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
