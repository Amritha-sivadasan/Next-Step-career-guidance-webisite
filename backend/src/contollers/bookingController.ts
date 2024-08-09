import { IBookingService } from "../services/interface/IBookingService";
import BookingService from "../services/implementations/BookingService";
import { ISlotService } from "../services/interface/ISlotService";
import SlotService from "../services/implementations/SlotService";
import { Request, Response } from "express";

class BookingController {
  private bookingservice: IBookingService;
  private slotService: ISlotService;
  constructor() {
    this.bookingservice = new BookingService();
    this.slotService = new SlotService();
  }

  public createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
  

      const result = await this.bookingservice.create(req.body);
      const slotId = result.updatedBooking?.slotId.toString();
      const bookingStatus = result.updatedBooking?.bookingStatus;

      if (!slotId || bookingStatus === undefined) {
        res.status(400).json({
          success: false,
          message: "Required data for slot update is missing",
        });
        return;
      }
      // await this.slotService.update(slotId, bookingStatus);
      res.status(200).json({
        success: true,
        data: result,
        message: "Successfully created new Booking",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: true, message: "Something went wrong on Booking" });
    }
  };

  public findAllExpertBooking = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.id;
    try {
      const result = await this.bookingservice.getBookingByExpertId(id);
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: result });
    } catch (error) {
      res.status(500).json({
        success: true,
        message: "Something went wrong  finding Bookings",
      });
    }
  };

  public updateBookingPaymentStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {status}=req.body
    try {
      const response = await this.bookingservice.updateBookingPaymentStatus(
        id!,
        status
      );
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: response });
    } catch (error) {
      res.status(500).json({
        success: true,
        message: "Update payment status failed",
      });
    }
  };
  public updateBookingStatus = async (req:Request,res:Response)=>{
    const {id}= req.params
    try {
      const response = await this.bookingservice.updateBookingStatus(
        id!,
        req.body
      );
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: response });
      
    } catch (error) {
      res.status(500).json({
        success: true,
        message: "Update Booking status failed",
      });
    }
  }
}

export default new BookingController();
