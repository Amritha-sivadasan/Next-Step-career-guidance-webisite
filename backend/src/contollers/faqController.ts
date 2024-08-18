import { Request, Response } from "express";
import { IFaqService } from "../services/interface/IFaqService";
import FaqService from "../services/implementations/FaqService";

class FaqController {
  private faqService: IFaqService;
  constructor() {
    this.faqService = new FaqService();
  }

  public saveQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
    const response= await this.faqService.saveQuestion(req.body)
      res.status(200).json({
        success: true,
        Message: "Question Send Successfully",
        data: response,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "something went wrong on add question" });
    }
  };
  public fetchAllQuestion = async(req:Request,res:Response):Promise<void>=>{
    try {
        const response= await this.faqService.fetchAllQuestion()
      res.status(200).json({
        success: true,
        Message: "Question Send Successfully",
        data: response,
      });
        
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "Error occurred during fetching question" });
    }
  }

  public updateAnswer=async(req:Request,res:Response):Promise<void>=>{
    const {id}= req.params
    const {answer}= req.body
    try {
      const response= await this.faqService.updateAnswer(id,answer)
      res.status(200).json({
        success: true,
        Message: "Question Send Successfully",
        data: response,
      });
    } catch (error) {
      res
      .status(500)
      .json({ success: false, message: "Error occurred during update Answer" });
    }
  }
}


export default new  FaqController()