import { useEffect, useState } from "react";
import { IvidoeCall } from "../../../@types/videoCall";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { findAllvideoCallByExpert } from "../../../services/api/videoCallApi";
import { IBooking } from "../../../@types/booking";
import { ISlot } from "../../../@types/slot";
import { IStudent } from "../../../@types/user";
import moment from "moment";
import { IReviewAndRating } from "../../../@types/reviewAndRating";
import {
  findAllReviewsByExpert,
  submitReviewByExpert,
  deleteReviewByExpert,
} from "../../../services/api/reviewAndRatingApi";
import StarRatings from "react-star-ratings";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const formatDateToIST = (dateString: string) => {
  return moment(dateString).format("DD/MM/YYYY");
};

const formatTimeToIST = (timeString: string) => {
  return moment(timeString, "HH:mm:ss").format("hh:mm A");
};

type Review = {
  review: string;
  rating: number;
};

type ReviewsAccumulator = {
  [key: string]: Review;
};

const ExpertMeetingHistory = () => {
  const { expert } = useAppSelector((state) => state.expert);
  const [meetingDetails, setMeetingDetails] = useState<IvidoeCall[]>([]);
  const [reviews, setReviews] = useState<ReviewsAccumulator>({});
  const [reviewDetails, setReviewDetails] = useState<
    Record<string, IReviewAndRating>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetDetails = async () => {
      if (expert) {
        const response = await findAllvideoCallByExpert();
  
        if (response.success) {
          const filterData=response.data.filter((item:IvidoeCall) =>{
             const completebooking= item.bookingId as IBooking
             return completebooking.meetingStatus=='completed'
          })
          setMeetingDetails(filterData);
          const meetingIds = filterData.map((meeting: IvidoeCall) => meeting._id);

          const reviewsPromises = meetingIds.map((meetingId: string) =>
            findAllReviewsByExpert(meetingId)
          );

          const reviewsResults = await Promise.all(reviewsPromises);

          const reviewsMap = reviewsResults.reduce(
            (acc: Record<string, IReviewAndRating>, reviewResult) => {
              const { data } = reviewResult;
              if (data !== null) {
                acc[data.meetingId] = data;
              }
              return acc;
            },
            {}
          );

          setReviewDetails(reviewsMap);
        }
      }
    };
    fetDetails();
  }, [expert]);

  const handleReviewChange = (meetingId: string, value: string) => {
    setReviews((prev) => ({
      ...prev,
      [meetingId]: {
        ...prev[meetingId],
        review: value,
      },
    }));
  };

  const handleRatingChange = (meetingId: string, rating: number) => {
    setReviews((prev) => ({
      ...prev,
      [meetingId]: {
        ...prev[meetingId],
        rating,
      },
    }));
  };

  const handleSubmitReview = async (meetingId: string) => {
    const reviewData = reviews[meetingId];
    if (!reviewData) return;

    const data = {
      ...reviewData,
      meetingId,
      expertId: expert?._id,
    };
    try {
      const response = await submitReviewByExpert(data);
      setReviewDetails((prev) => ({
        ...prev,
        [meetingId]: {
          ...response.data,
        },
      }));
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meetingDetails.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteReview = async (meetingId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this review?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        const response = await deleteReviewByExpert(meetingId);
        console.log("Response for the delete", response);

        setReviewDetails((prev) => ({
          ...prev,
          [meetingId]: response.data,
        }));
    
        Swal.fire("Deleted!", "The review has been deleted.", "success");
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      Swal.fire(
        "Error!",
        "Failed to delete the review. Please try again later.",
        "error"
      );
    }
  };

  const totalPages = Math.ceil(meetingDetails.length / itemsPerPage);

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Meeting Details</h1>
      <div className="space-y-4">
        {currentItems.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings here</p>
        ) : (
          currentItems.map((meeting) => {
            const student = meeting.studentId as IStudent;
            const booking = meeting.bookingId as IBooking;
            const slot = booking.slotId as ISlot;

            return (
              <div
                key={meeting._id}
                className="flex flex-col bg-[#F2F2F2] shadow-md rounded-lg p-4"
              >
                <div className="flex flex-col md:flex-row items-start md:items-start mb-4">
                  <div className="flex flex-col md:flex-row w-full md:w-auto mb-4 md:mb-0">
                    <img
                      src={student?.profile_picture}
                      alt="Student"
                      className="h-28 w-28 rounded-lg object-cover mr-4"
                    />
                    <div className="text-lg text-gray-800">
                      <div className="font-semibold">{student.user_name}</div>
                      <div className="text-sm text-gray-600">
                        Current Status: <strong>{student.user_type}</strong>
                      </div>
                      <div className="text-sm text-gray-600">
                        Education Level:{" "}
                        <strong>{student.education_level}</strong>
                      </div>
                      <div className="text-sm text-gray-600">
                        Education Background:{" "}
                        <strong>{student.education_background}</strong>
                      </div>
                      <div className="text-sm text-gray-600">
                        Meeting URL:{" "}
                        <strong className="text-blue-500">{meeting.url}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Slot Details */}
                  <div className="flex flex-col md:flex-col text-md text-gray-800 ms-10 ">
                    <div className="mb-2 md:mb-0">
                      Date:{" "}
                      <strong className="text-gray-800">
                        {formatDateToIST(slot.consultationDate)}
                      </strong>
                    </div>
                    <div>
                      From:{" "}
                      <strong className="text-gray-800">
                        {formatTimeToIST(slot.consultationStartTime)}
                      </strong>
                    </div>
                    <div>
                      To:{" "}
                      <strong className="text-gray-800">
                        {formatTimeToIST(slot.consultationEndTime)}
                      </strong>
                    </div>
                    <div>
                      Meeting Status:{" "}
                      <strong className="text-gray-800">
                        {booking.meetingStatus}
                      </strong>
                    </div>
                    <div className="mt-5">
                      Booking Status:{" "}
                      <span
                        className={`border p-2 rounded-lg text-white ${
                          booking.bookingStatus === "completed"
                            ? "bg-green-600"
                            : booking.bookingStatus === "confirmed"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex flex-col mt-4 p-4 bg-white shadow-md rounded-lg ${
                    reviewDetails[meeting._id!]?.is_delete && "hidden"
                  }`}
                >
                  {reviewDetails[meeting._id!] &&
                  !reviewDetails[meeting._id!].is_delete ? (
                    <div className="border p-4 rounded-lg bg-gray-100">
                      <div className="flex justify-between">
                        <p className="font-semibold text-lg">Your Review:</p>
                        <button
                          onClick={() => handleDeleteReview(meeting._id!)}
                        >
                          <MdDelete size={24} />
                        </button>
                      </div>
                      <p>{reviewDetails[meeting._id!].review}</p>
                      <StarRatings
                        rating={reviewDetails[meeting._id!].rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="30px"
                        starSpacing="5px"
                        starEmptyColor="gray"
                      />
                    </div>
                  ) : (
                    !reviewDetails[meeting._id!]?.is_delete && (
                      <>
                        <textarea
                          value={reviews[meeting._id!]?.review || ""}
                          onChange={(e) =>
                            handleReviewChange(meeting._id!, e.target.value)
                          }
                          placeholder="Write your review here..."
                          className="border rounded-lg p-2 w-full mb-4"
                        />
                        <StarRatings
                          rating={reviews[meeting._id!]?.rating || 0}
                          starRatedColor="gold"
                          changeRating={(rating: number) =>
                            handleRatingChange(meeting._id!, rating)
                          }
                          numberOfStars={5}
                          name="rating"
                          starDimension="30px"
                          starSpacing="5px"
                          starEmptyColor="gray"
                        />
                        <button
                          onClick={() => handleSubmitReview(meeting._id!)}
                          className="bg-blue-950 text-white p-2 rounded-lg mt-5 w-3/12"
                        >
                          Submit Review
                        </button>
                      </>
                    )
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:bg-gray-400 cursor-pointer"
        >
          <FaArrowAltCircleLeft />
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 disabled:bg-gray-400 cursor-pointer"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default ExpertMeetingHistory;
