import  { Schema ,model,Document } from "mongoose";
import { IBooking } from "../entities/BookingEntity";

const BookingSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, required: true },
    expertId: { type: Schema.Types.ObjectId, required: true },
    bookingStatus: { type: String, required: true, enum: [ 'pending', 'confirmed', 'canceled' ] },
    subCatName: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true, enum: [ 'completed', ' pending ', 'cancelled' ] },
    slotId: { type: Schema.Types.ObjectId, required: true },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, required: true },
  });
  
  const Booking = model<IBooking & Document>('Booking', BookingSchema);
  
  export default Booking; 