import  { Schema ,model,Document } from "mongoose";
import { IBooking } from "../entities/BookingEntity";

const BookingSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, required: true ,ref: 'Student'},
    expertId: { type: Schema.Types.ObjectId, required: true ,ref: 'Expert'},
    bookingStatus: { type: String, default:'pending', enum: [ 'pending', 'confirmed', 'cancelled' ] },
    subCatName: { type: String  },
    paymentAmount: { type: Number },
    paymentStatus: { type: String, default:'pending', enum: [ 'completed', 'pending', 'cancelled','refund' ] },
    slotId: { type: Schema.Types.ObjectId,ref: 'Slot' },
    paymentMethod: { type: String },
    transactionId: { type: String },
    meetingStatus: { type: String, default:'pending', enum: [ 'completed', 'pending' ] }
  },{timestamps:true});
  
  const Booking = model<IBooking & Document>('Booking', BookingSchema);
  
  export default Booking; 