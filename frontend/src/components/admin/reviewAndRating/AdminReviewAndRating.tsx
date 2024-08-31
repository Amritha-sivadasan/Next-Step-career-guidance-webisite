import { useEffect, useState } from "react";
import { IReviewAndRating } from "../../../@types/reviewAndRating";
import { fetchAllReviews } from "../../../services/api/reviewAndRatingApi";
import StarRatings from "react-star-ratings";
import { IStudent } from "../../../@types/user";
import { IExpert } from "../../../@types/expert";
import { IvidoeCall } from "../../../@types/videoCall";
import LoadingPage from "../../common/Loading/LoadingPage";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<IReviewAndRating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchAllReviews();

        if (response.success) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return  <LoadingPage />;
    }

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Admin Review Management
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Expert Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => {
                const student = review.studentId as IStudent;
                const expert = review.expertId as IExpert;
                const meeting = review.meetingId as IvidoeCall;

                return (
                  <tr key={review._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student && student.user_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expert && expert.user_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {meeting.bookingId as string}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <StarRatings
                          rating={review.rating}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="2px"
                          starEmptyColor="gray"
                          starHoverColor="gold"
                        />
                        <span className="ml-2">{review.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.review}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReviewsPage;
