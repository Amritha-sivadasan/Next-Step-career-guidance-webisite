import  { Schema ,model,Document } from "mongoose";
import { IBooking } from "../entities/BookingEntity";

const BookingSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, required: true },
    expertId: { type: Schema.Types.ObjectId, required: true },
    bookingStatus: { type: String, default:'pending', enum: [ 'pending', 'confirmed', 'cancelled' ] },
    subCatName: { type: String  },
    paymentAmount: { type: Number },
    paymentStatus: { type: String, default:'pending', enum: [ 'completed', 'pending', 'cancelled','refund' ] },
    slotId: { type: Schema.Types.ObjectId },
    paymentMethod: { type: String },
    transactionId: { type: String },
  },{timestamps:true});
  
  const Booking = model<IBooking & Document>('Booking', BookingSchema);
  
  export default Booking; 