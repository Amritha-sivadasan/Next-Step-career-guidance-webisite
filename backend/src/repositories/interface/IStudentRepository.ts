import { IStudent } from "../../entities/StudentEntity";

export interface IStudentRepository {
  findAll(): Promise<IStudent[]>;
  findById(id: string): Promise<IStudent | null>;
  create(student: Partial<IStudent>): Promise<IStudent>;
  update(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
  findOne(email:string):Promise<IStudent|null>;
  findUsertById( authentication_id:string,):Promise<IStudent|null>
}
