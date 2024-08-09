import { IExpert } from "../../entities/ExpertEntity";

export interface IExpertService{
  getAllExperts(page:number,limit:number): Promise<{ items: IExpert[], totalCount: number, totalPages: number, currentPage: number }>;
  getExpertById(id: string): Promise<IExpert | null>;
  createExpert(expert: Partial<IExpert>): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }>;
  updateExpertData(id: string, expert: Partial<IExpert>, files: { [fieldname: string]: Express.Multer.File[] }): Promise<IExpert | null>;
  existsExpert(email: string): Promise<IExpert | null>;
  login(email: string, password: string): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }>;
  updatePassword(email: string, newPassword: string): Promise<void>;
  verifyExpert(id:string):Promise<Boolean>
  rejectExpert(id: string, reason: string):Promise<boolean>
  findExpertBySubCatName(subCatName:string): Promise<IExpert[] | null>;
  fetchAllExpert(): Promise<IExpert[] | null>
}