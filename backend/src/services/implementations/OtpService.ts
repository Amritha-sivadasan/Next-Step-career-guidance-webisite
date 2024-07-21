import { IOtpService } from "../interface/IOtpService";
import { IOtp } from "../../entities/OtpEntity";
import { IOtpRepository } from "../../repositories/interface/IOtpRepository";
import OtpRepository from "../../repositories/implementations/OtpRepository";
import { generateOtp } from "../../utils/generateOtp";
import { sendOtpToUser } from "../../utils/sendOtp";

export default class OtpService implements IOtpService {
  private otpRepository: IOtpRepository;
  constructor() {
    this.otpRepository = new OtpRepository();
  }

  async generateOtp(email: string, context: string): Promise<void> {
    const otpCode = await generateOtp(4);
    const otpObj: IOtp = {
      email,
      context,
      otp: otpCode,
      createdAt: new Date(),
    };
    await this.otpRepository.create(otpObj, email);
    await sendOtpToUser(email, otpCode);
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const otpRecord = await this.otpRepository.fetchOtp(email);
    if (otp === otpRecord?.otp) {
      await this.otpRepository.deleteOtp(email);
      return true;
    }
    return false;
  }
  async deleteOtp(email: string): Promise<void> {
    await this.otpRepository.deleteOtp(email);
  }
  async resendOtp(email: string, context: string): Promise<void> {
    await this.generateOtp(email, context);
  }


}
