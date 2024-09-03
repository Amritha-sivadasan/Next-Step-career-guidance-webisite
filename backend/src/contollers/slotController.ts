import { Request, Response } from "express";
import { ISlotService } from "../services/interface/ISlotService";
import SlotService from "../services/implementations/SlotService";

class SlotController {
  private slotService: ISlotService;

  constructor() {
    this.slotService = new SlotService();
  }

  public CreateSlot = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.slotService.createSlots(req.body);
      res.status(200).json({
        success: true,
        data: result,
        message: "Slot created Successfully",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("New slot must end at least one hour before the next slot starts")) {
    
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
