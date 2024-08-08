import { IBookingService } from "../services/interface/IBookingService";
import BookingService from "../services/implementations/BookingService";
import { Request,Response } from "express";

class BookingController{
    private bookingservice: IBookingService
    constructor() {
        this.bookingservice= new BookingService()
    }

    public createBooking= async (req:Request,res:Response):Promise<void>=>{
        try {
            const result = await this.bookingservice.create(req.body)
            res.status(200).json({success:true, data:result , message:"Successfully created new Booking"})
            
        } catch (error) {
        res.status(500).json({success:true,message:'Something went wrong on Booking'})
        }
    }

    public findAllExpertBooking = async(req:Request,res:Response):Promise<void>=>{
        const id= req.params.id
        try {
            const result = await this.bookingservice.getBookingByExpertId(id)
            res.status(200).json({success:true, message:"successfull ",data:result})
        } catch (error) {
            res.status(500).json({success:true,message:'Something went wrong  finding Bookings'})
        }
    }


}


export default new BookingController()
