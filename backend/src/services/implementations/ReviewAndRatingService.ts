import { IReviewAndRatingService } from "../interface/IReviewAndRatingService";
import { IReviewAndRAtingRepository } from "../../repositories/interface/IReviewAndRatingRespository";
import ReviewAndRatingRepository from "../../repositories/implementations/ReviewAndRatingRepository";
import { IReviewAndRating } from "../../entities/RevieAndRating";

export default class ReviewAndRatingService implements IReviewAndRatingService{
    private reviewAndReviewRepository :IReviewAndRAtingRepository
    constructor() {
        this.reviewAndReviewRepository= new ReviewAndRatingRepository
    }

    async submitReview(review: Partial<IReviewAndRating>): Promise<IReviewAndRating> {
        try {
        const result= await this.reviewAndReviewRepository.submitReviewAndRating(review)
        return result
            
        } catch (error) {
            throw error
        }
    }

    async fetchReviewById(userId: string,meetingId:string): Promise<IReviewAndRating|null> {
        try {
            const result = await this.reviewAndReviewRepository.fetchReviewsByid(userId,meetingId)
            return result
            
        } catch (error) {
            throw error
        }
    }
}