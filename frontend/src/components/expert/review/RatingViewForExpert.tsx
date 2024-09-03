import { useEffect, useRef, useState } from "react";
import { IReviewAndRating } from "../../../@types/reviewAndRating";
import { fetchAllReviewByExpert } from "../../../services/api/reviewAndRatingApi";
import { IExpert } from "../../../@types/expert";
import StarRatings from "react-star-ratings";
import {motion, useInView} from 'framer-motion'

const RatingViewForExpert = () => {
  const [reviewDetails, setReviewDetails] = useState<IReviewAndRating[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetchAllReviewByExpert();
      if (response.success) {
        setReviewDetails(response.data.slice(0, 3));
      }
    };

    fetchReview();
  }, []);

  return (
    <motion.div className="py-16 mb-10 bg-gray-100"     ref={sectionRef}

    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: isInView ? 1 : 0,
      scale: isInView ? 1 : 0.8,
    }}
    transition={{ duration: 0.8, ease: "easeOut" }}>
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
        What Our Experts Say
      </h2>
      <p className="text-center text-gray-600 mb-8">from around the world</p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewDetails.map((testimonial, index) => {
          const expert = testimonial.expertId as IExpert;
          return (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <img
                  className="w-32 h-32 border-4"
                  src={expert.profile_picture}
                  alt={expert.user_name}
                />
                <div className="text-center mt-4">
                  <p className="text-xl font-bold text-gray-900">
                    {expert.user_name}
                  </p>
                  {/* <p className="text-sm text-gray-500 truncate w-full">
                    {expert.personal_bio}
                  </p> */}
                  <p className="text-sm text-gray-500">
                    {expert.educationBackground}
                  </p>
                  <div className="mt-2">
                    <p className="text-gray-700 text-base leading-relaxed">
                      {testimonial.review}
                    </p>
                    <StarRatings
                      rating={testimonial.rating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="4px"
                      starEmptyColor="gray"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RatingViewForExpert;
