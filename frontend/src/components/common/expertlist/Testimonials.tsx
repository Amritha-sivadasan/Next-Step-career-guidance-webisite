import React, { useEffect, useState } from "react";
import "../../../App.css";
import { getAllExperts } from "../../../services/api/studentApi";
import { IExpert } from "../../../@types/expert";

const Testimonials: React.FC = () => {
  // const [testimonials, setTestimonials] = useState<IExpert[]>([]);
  const [duplicatedTestimonials, setDuplicatedTestimonials] = useState<
    IExpert[]
  >([]);

  useEffect(() => {
    const fetchExpert = async () => {
      const response = await getAllExperts();
      const minimumCardsToDisplay = 10;
      const repeatTimes = Math.ceil(
        minimumCardsToDisplay / response.data.length
      );
      setDuplicatedTestimonials(
        Array(repeatTimes)
          .fill(response.data)
          .flat()
      );
    };

    fetchExpert();
  }, []);

  return (
    <section className="py-20 w-full">
      <div className="mx-auto text-center w-full">
        <div className="flex flex-col justify-center mb-24">
          <h3 className="text-[#0B2149]">Meet our popular Mentors</h3>
          <h2 className="text-3xl font-bold text-[#0B2149]">Our Experts</h2>
        </div>
        <div className="bg-[#F0F8FF]">
          <div className="p-5  overflow-hidden">
            <div className="scroll-container">
              <div className="scroll-content flex space-x-12 mt-4  animate-scroll">
                {" "}
                {duplicatedTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="scroll-item bg-white p-6 rounded-lg shadow-md flex flex-col items-center max-w-72"
                  >
                    {typeof testimonial.profile_picture === "string" && (
                      <img
                        src={testimonial.profile_picture}
                        alt={testimonial.user_name}
                        className="w-24 h-24 object-cover mb-4 rounded-full"
                      />
                    )}

                    <p className="italic mb-4 text-center max-w-full truncate overflow-hidden">
                      {testimonial.personal_bio}
                    </p>
                    <p className="italic mb-4 text-center max-w-full truncate overflow-hidden">
                      {testimonial.educationBackground}
                    </p>

                    <div className="font-bold text-lg text-center">
                      {testimonial.user_name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
