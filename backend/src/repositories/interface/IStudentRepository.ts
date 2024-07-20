import { IStudent } from "../../entities/StudentEntity";

export interface IStudentRepository {
  findAll(): Promise<IStudent[]>;
  findById(id: string): Promise<IStudent | null>;
  create(student: IStudent): Promise<IStudent>;
  update(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
}
