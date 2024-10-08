import { Request, Response } from "express";
import { ISlotService } from "../services/interface/ISlotService";
import SlotService from "../services/implementations/SlotService";
import { CustomRequest } from "../entities/jwtEntity";

class SlotController {
  private slotService: ISlotService;

  constructor() {
    this.slotService = new SlotService();
  }

  public CreateSlot = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const userId=req.user?.userId
      const result = await this.slotService.createSlots(userId!,req.body);
      res.status(200).json({
        success: true,
        data: result,
        message: "Slot created Successfully",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("New slot must start at least one hour after the end of the existing slot.")) {
    
        res.status(400).json({
            message: error.message,
            success: false,
            data: null,
        });
    } else {
    
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            data: null,
        });
    }
    }
  };

  public getAllSlotByExpert = async (req: Request, res: Response) => {
    try {
      const { expertId } = req.params;
      console.log("expertId",expertId)
      const result = await this.slotService.getSlotsById(expertId);
      res
        .status(200)
        .json({ success: true, data: result, messsage: "successufull" });
    } catch (error) {
      res.status(500).json({
        message: "Unable to get all slots",
        success: false,
        data: error,
      });
    }
  };

  public deleteSlots = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.slotService.deleteSlot(id);
      res
        .status(200)
        .json({ success: true, data: result, messsage: "successufull" });
    } catch (error) {
      res.status(500).json({
        message: "Unable to delete",
        success: false,
        data: error,
      });
    }
  };
}

export default new SlotController();
