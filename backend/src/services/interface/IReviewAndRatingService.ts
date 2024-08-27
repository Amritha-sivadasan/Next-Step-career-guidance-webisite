import { IReviewAndRating } from "../../entities/RevieAndRating";

export interface IReviewAndRatingService {
    submitReview(review:Partial<IReviewAndRating>):Promise<IReviewAndRating>
    fetchReviewById(userId:string,meetingId:string):Promise<IReviewAndRating|null>
}