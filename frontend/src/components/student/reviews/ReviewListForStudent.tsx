import { useEffect, useState } from "react";
import { IReviewAndRating } from "../../../@types/reviewAndRating";
import { fetchAllReviewByStudent } from "../../../services/api/reviewAndRatingApi";
import { IStudent } from "../../../@types/user";
import StarRatings from "react-star-ratings";

const ReviewListForStudent = () => {
  const [reviewDetails, setReviewDetails] = useState<IReviewAndRating[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetchAllReviewByStudent();
      if (response.success) {
        setReviewDetails(response.data.slice(0,3));
      }
    };

    fetchReview();
  }, []);

  return (
    <div className="py-16 mb-10 bg-gray-100">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
        What Our Students Say
      </h2>
      <p className="text-center text-gray-600 mb-8">from around the world</p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewDetails.map((testimonial, index) => {
          const student = testimonial.studentId as IStudent;
          return (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  className="w-24 h-24 rounded-full border-4 border-indigo-300"
                  src={student.profile_picture}
                  alt={student.user_name}
                />
                <div className="ml-6">
                  <p className="text-xl font-bold text-gray-900">
                    {student.user_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {student.education_background}
                  </p>
                  <p className="text-sm text-gray-500">
                    {student.education_level}
                  </p>
                  <div className="mt-3">
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
    </div>
  );
};

export default ReviewListForStudent;
