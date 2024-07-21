export interface IOtpService {
  generateOtp(email: string, context: string): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<boolean>;
  deleteOtp(email:string):Promise<void>
  resendOtp(email:string,context:string): Promise<void>
}
