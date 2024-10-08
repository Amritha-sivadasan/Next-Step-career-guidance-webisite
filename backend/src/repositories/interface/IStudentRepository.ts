import { IStudent } from "../../entities/StudentEntity";

export interface IStudentRepository {
  findAll(page:number,limit:number): Promise<IStudent[]>;
  findById(id: string): Promise<IStudent | null>;
  create(student: Partial<IStudent>): Promise<IStudent>;
  update(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
  findOne(email:string):Promise<IStudent|null>;
  findUserById( authentication_id:string,):Promise<IStudent|null>
  countDocuments(): Promise<number>
  chechUserStatus(id:string):Promise<IStudent|null>
  fetchAllDetails(): Promise<IStudent[]>;
}
