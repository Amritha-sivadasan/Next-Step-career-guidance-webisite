import { Schema ,model,Document} from "mongoose";
import { IOtp } from "../entities/OtpEntity";
const OtpSchema:Schema=new Schema({
    email: { type: String, required: true },
    createdAt: { type: Date, expires: '10m', default: Date.now, required: true },
    context: { type: String, required: true },
    otp: { type: String, required: true }
 })

 OtpSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

OtpSchema.pre('updateOne', function(next) {
    this.set({ createdAt: new Date() });
    next();
});

OtpSchema.pre('findOneAndUpdate', function(next) {
    this.set({ createdAt: new Date() });
    next();
})


const Otp = model<IOtp & Document>('Otp',OtpSchema)

export {Otp}