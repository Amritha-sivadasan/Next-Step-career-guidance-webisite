import { IReviewAndRating } from "../../entities/RevieAndRating";

export interface IReviewAndRAtingRepository {
submitReviewAndRating(review:Partial<IReviewAndRating>):Promise<IReviewAndRating> 
fetchReviewsByid(userId:string,meetingId:string):Promise<IReviewAndRating|null>
deleteReview(userId:string, meetingId:string):Promise<IReviewAndRating|null>

}