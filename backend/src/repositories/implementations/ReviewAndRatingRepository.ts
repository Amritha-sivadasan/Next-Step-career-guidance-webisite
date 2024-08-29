import { IReviewAndRAtingRepository } from "../interface/IReviewAndRatingRespository";
import { IReviewAndRating } from "../../entities/RevieAndRating";
import { ReviewAndRating } from "../../models/reviewAndRatingSchema";

export default class ReviewAndRatingRepository
  implements IReviewAndRAtingRepository
{
  async submitReviewAndRating(
    review: Partial<IReviewAndRating>
  ): Promise<IReviewAndRating> {
    try {
      const newReview = new ReviewAndRating(review);
      return await newReview.save();
    } catch (error) {
      throw error;
    }
  }

  async fetchReviewsByid(
    userId: string,
    meetingId: string
  ): Promise<IReviewAndRating | null> {
    try {
      const result = await ReviewAndRating.findOne({
        $or: [{ studentId: userId }, { expertId: userId }],
        meetingId: meetingId,
      }).exec();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteReview(
    userId: string,
    meetingId: string
  ): Promise<IReviewAndRating | null> {
    try {
      const result = await ReviewAndRating.findOneAndUpdate(
        {
          $or: [{ studentId: userId }, { expertId: userId }],
          meetingId: meetingId,
        },
        { is_delete: true },
        { new: true }
      ).exec();

      return result;
    } catch (error) {
      throw error;
    }
  }
}
