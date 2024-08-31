import { IReviewAndRating } from "../../entities/RevieAndRating";

export interface IReviewAndRatingService {
    submitReview(review:Partial<IReviewAndRating>):Promise<IReviewAndRating>
    fetchReviewById(userId:string,meetingId:string):Promise<IReviewAndRating|null>
    deleteReview(userId:string,meetingId:string):Promise<IReviewAndRating|null>
    findAllReviews():Promise<IReviewAndRating[]>
    fetchReviewByStudent():Promise<IReviewAndRating[]>
    fetchReviewByExpert():Promise<IReviewAndRating[]>
}