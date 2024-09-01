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

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reviewsPerPage] = useState<number>(5); // Adjust this to change the number of reviews per page
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchAllReviews();

        if (response.success) {
          setReviews(response.data);
          setTotalPages(Math.ceil(response.data.length / reviewsPerPage));
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [reviewsPerPage]);

  if (loading) {
    return <LoadingPage />;
  }

  // Calculate the indexes for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle next and previous buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Admin Review Management
      </h1>

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews available</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
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
                {currentReviews.map((review, index) => {
                  const student = review.studentId as IStudent;
                  const expert = review.expertId as IExpert;
                  const meeting = review.meetingId as IvidoeCall;

                  return (
                    <tr key={review._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {indexOfFirstReview + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student
                          ? student.user_name
                          : expert && expert.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(expert ? expert.role : student && student.role)
                          ?.charAt(0)
                          .toUpperCase() +
                          (expert
                            ? expert.role
                            : student && student.role
                          )?.slice(1)}
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

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex space-x-2">
             
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === index + 1
                      ? " text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                 <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReviewsPage;
