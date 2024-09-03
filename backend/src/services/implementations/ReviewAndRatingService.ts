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

    async deleteReview(userId: string, meetingId: string): Promise<IReviewAndRating | null> {
        try {
            const result = await this.reviewAndReviewRepository.deleteReview(userId,meetingId)
            return result
            
        } catch (error) {
            throw error
        }
    }

    async findAllReviews(): Promise<IReviewAndRating[]> {
        try {
            const result = await this.reviewAndReviewRepository.fetchAllReview()
            return result
            
        } catch (error) {
            throw error
        }
    }

    async fetchReviewByExpert(): Promise<IReviewAndRating[]> {
        try {

            const result= await this.reviewAndReviewRepository.fetAllRevieByExpert()
            let sum= result.reduce((acc,curr)=>acc+curr.rating,0)
            let average=Math.floor(sum/result.length) 
            const arr=result.filter((item)=>item.rating==average)
           return arr.slice(0,3)
            
        } catch (error) {
          throw error
        }
    }

    async fetchReviewByStudent(): Promise<IReviewAndRating[]> {
        try {
            const result= await this.reviewAndReviewRepository.fetAllRevieByStudent()
            let sum= result.reduce((acc,curr)=>acc+curr.rating,0)
             let average=Math.floor(sum/result.length) 
             const arr=result.filter((item)=>item.rating==average)
            return arr.slice(0,3)
        } catch (error) {
            throw error
        }
    }
}