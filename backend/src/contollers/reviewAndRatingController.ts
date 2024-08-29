import { Request,Response } from "express";

import { IReviewAndRatingService } from "../services/interface/IReviewAndRatingService";
import ReviewAndRatingService from "../services/implementations/ReviewAndRatingService";
import { CustomRequest } from "../entities/jwtEntity";

class ReviewAndRatingController {
    private reviewAndRatingService :IReviewAndRatingService
    constructor() {
        this.reviewAndRatingService= new ReviewAndRatingService()
    }

    public submitReviewAndRating= async(req:Request,res:Response)=>{
        try {
           
          const response= await this.reviewAndRatingService.submitReview(req.body)

            res.status(200).json({
              success: true,
              data: response,
              message: "",
            });
            
        } catch (error) {
            res.status(500).json({
                message: "something went wrong in submit review",
                success: false,
                data: error,
              });
        }
    }

 public fetchReviewDetailsById= async(req:CustomRequest,res:Response)=>{
    try {
        const id= req.user?.userId
        const {meetingId}= req.params
        const response= await this.reviewAndRatingService.fetchReviewById(id!,meetingId)
        res.status(200).json({
            success: true,
            data: response,
            message: "",
          });
        
    } catch (error) {
        res.status(500).json({
            message: "something went wrong in fetching review",
            success: false,
            data: error,
          });
    }
 }


 public deleteReviewAndRating = async(req:CustomRequest,res:Response)=>{
  try {
    const id= req.user?.userId
    const {meetingId}= req.params
    const response= await this.reviewAndRatingService.deleteReview(id!,meetingId)
    res.status(200).json({
        success: true,
        data: response,
        message: "",
      });
    
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in fetching review",
      success: false,
      data: error,
    });
  }
 }
}

export default new ReviewAndRatingController()