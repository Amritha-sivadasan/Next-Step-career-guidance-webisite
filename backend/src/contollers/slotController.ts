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
      res.status(500).json({
        message: "Unable to create slots",
        success: false,
        data: error,
      });
    }
  };
}


export default  new SlotController()