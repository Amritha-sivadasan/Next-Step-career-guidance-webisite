import { IBookingService } from "../services/interface/IBookingService";
import BookingService from "../services/implementations/BookingService";
import { ISlotService } from "../services/interface/ISlotService";
import SlotService from "../services/implementations/SlotService";
import { Request, Response } from "express";
import { CustomRequest } from "../entities/jwtEntity";

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
      await this.slotService.update(slotId, bookingStatus);
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
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const id = req.user?.userId;
    try {
      const result = await this.bookingservice.getBookingByExpertId(id!);
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding Bookings",
      });
    }
  };

  public findAllExpertPayment = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const id = req.user?.userId;
    try {
      const result = await this.bookingservice.getAllBookingByExpertId(id!);
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding Bookings",
      });
    }
  };

  public findAllBookingByStudentId = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const id = req.user?.userId;
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 10;
      if (page <= 0 || limit <= 0) {
        res.status(400).json({
          message: "Invalid page or limit value",
          success: false,
        });
        return;
      }

      const result = await this.bookingservice.getAllBookingByStudentId(
        id!,
        page,
        limit
      );
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding Bookings",
      });
    }
  };

  public findAllPaymentByStudentId = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const id = req.user?.userId;
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 10;
      if (page <= 0 || limit <= 0) {
        res.status(400).json({
          message: "Invalid page or limit value",
          success: false,
        });
        return;
      }

      const result = await this.bookingservice.getAllPaymentByStudentId(
        id!,
        page,
        limit
      );
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding Bookings",
      });
    }
  };

  public updateBookingPaymentStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
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

  public findAllConfirmBooking = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const id = req.user?.userId;
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 10;
      if (page <= 0 || limit <= 0) {
        res.status(400).json({
          message: "Invalid page or limit value",
          success: false,
        });
        return;
      }

      const result = await this.bookingservice.getConfirmBooking(
        id!,
        page,
        limit
      );
      res
        .status(200)
        .json({ success: true, message: "successfull ", data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding Bookings",
      });
    }
  };

  public refundPayment = async (req: CustomRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const response = await this.bookingservice.refundPayment(id, reason);
      res
        .status(200)
        .json({ message: "Refund success", data: response, success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  refunding payment",
      });
    }
  };

  public findAllBookingForAdmin = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 10;
      if (page <= 0 || limit <= 0) {
        res.status(400).json({
          message: "Invalid page or limit value",
          success: false,
        });
        return;
      }
      const response = await this.bookingservice.getAllBooking(page, limit);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          items: response.items,
          pagination: {
            totalCount: response.totalCount,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            perPage: limit,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding All Bookings",
      });
    }
  };

  public updatemeetingstatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const response = await this.bookingservice.updatemeetingstatus(
        id!,
        status
      );
      res.status(200).json({
        success: true,
        message: "",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error during the update meeting status",
      });
    }
  };

  public findBookingByIdForAdmin = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const response = await this.bookingservice.getBookingById(id);
      res.status(200).json({
        success: true,
        message: "",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding All Bookings",
      });
    }
  };

  public fingPaymentStatusbyBookingId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { bookingId } = req.params;
      const response = await this.bookingservice.getBookingById(bookingId);
      res.status(200).json({
        success: true,
        message: "",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong  finding All Bookings",
      });
    }
  };
}

export default new BookingController();
