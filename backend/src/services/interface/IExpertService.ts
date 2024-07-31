import { IExpert } from "../../entities/ExpertEntity";

export interface IExpertService{
  getAllExperts(): Promise<IExpert[]>;
  getExpertById(id: string): Promise<IExpert | null>;
  createExpert(expert: Partial<IExpert>): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }>;
  updateExpertData(id: string, expert: Partial<IExpert>, files: { [fieldname: string]: Express.Multer.File[] }): Promise<IExpert | null>;
  existsExpert(email: string): Promise<IExpert | null>;
  login(email: string, password: string): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }>;
  updatePassword(email: string, newPassword: string): Promise<void>;
  verifyExpert(id:string):Promise<Boolean>
}