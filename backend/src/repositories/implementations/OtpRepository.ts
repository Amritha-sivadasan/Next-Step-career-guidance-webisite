import { IOtpRepository } from "../interface/IOtpRepository";
import { IOtp } from "../../entities/OtpEntity";
import { Otp } from "../../models/otpSchema";

export default class OtpRepository implements IOtpRepository {
  async create(otp: IOtp, email: String): Promise<void> {
    await Otp.updateOne({ email }, otp, { upsert: true }).exec();
  }

  async fetchOtp(email: string): Promise<(IOtp & Document) | null> {
    return Otp.findOne({ email });
  }

  async deleteOtp(email: string): Promise<void> {
    await Otp.deleteOne({ email }).exec();

  }
 
}
