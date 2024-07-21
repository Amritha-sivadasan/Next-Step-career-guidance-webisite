import { IExpert } from "../../entities/ExpertEntity";

export interface IExpertSevice{
    getAllExprt():Promise<IExpert[]>;
    getExpertById(id:string):Promise<IExpert|null>
    createdExpert(expert:IExpert):Promise<{ expert: IExpert; accessToken: string; refreshToken: string }>
    updateStudent(id: string, expert: Partial<IExpert>): Promise<IExpert | null>
    exitExpert(email:string): Promise<IExpert|null>;
    login(
        email: string,
        password: string
      ): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }>
    
    
}