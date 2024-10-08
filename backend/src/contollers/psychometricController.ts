import { Request, Response } from "express";
import { IPsychometricService } from "../services/interface/IpsychometricService";
import PsychometricService from "../services/implementations/PsychometricService";

class PsychometricController {
  private psychometricService: IPsychometricService;
  constructor() {
    this.psychometricService = new PsychometricService();
  }

  public addNewQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const response = await this.psychometricService.createQuestion(req.body)
      res.status(200).json({
        success: true,
        data: response,
        message: "Slot created Successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: "Unable to create Psychometric test",
        success: false,
        data: error,
      });
    }
  };

  public fetchAllQuestions = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      
      const response = await this.psychometricService.findAllQuestions()
      res.status(200).json({
        success: true,
        data: response,
        message: "fetch all questions",
      });

    } catch (error) {
      res.status(500).json({
        message: "Unable to create Psychometric test",
        success: false,
        data: error,
      });
    }
  };

  public deleteQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const {id}= req.params
      
      const response = await this.psychometricService.deleteQuestion(id)
      res.status(200).json({
        success: true,
        data: response,
        message: "Slot created Successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: "Unable to create Psychometric test",
        success: false,
        data: error,
      });
    }
  };
  public submitAnswer = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {id}= req.params
      const response = await this.psychometricService.submitAnswer(id,req.body)
      res.status(200).json({
        success: true,
        data: response,
        message: "",
      });

    } catch (error) {
      res.status(500).json({
        message: "Unable to create Psychometric test",
        success: false,
        data: error,
      });
    }
  };

}


export default new PsychometricController();
