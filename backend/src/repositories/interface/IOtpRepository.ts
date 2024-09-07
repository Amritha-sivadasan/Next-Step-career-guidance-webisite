import {IOtp} from '../../entities/OtpEntity'

export interface IOtpRepository{
    create(otp: IOtp,email:string): Promise<void>,
    fetchOtp(email: string): Promise<IOtp  | null>
    deleteOtp(email:string):Promise<void>
}
