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

  async fetchAllReview(): Promise<IReviewAndRating[]> {
    try {
      const response = await ReviewAndRating.find({ is_delete: false })
        .populate("meetingId")
        .populate("studentId")
        .populate("expertId");
      return response;
    } catch (error) {
      throw error;
    }
  }
  async fetAllRevieByStudent(): Promise<IReviewAndRating[]> {
    try {
      const result = await ReviewAndRating.find({
        studentId: { $exists: true, $ne: null },
        is_delete: false,
      }).sort({rating:-1}).populate('studentId')
      return result;
    } catch (error) {
      throw error;
    }
  }
  async fetAllRevieByExpert(): Promise<IReviewAndRating[]> {
    try {
      const result = await ReviewAndRating.find({
        expertId: { $exists: true, $ne: null },
        is_delete: false,
      }).sort({rating:-1}).populate('expertId')
      return result;
    } catch (error) {
      throw error;
    }
  }
}
