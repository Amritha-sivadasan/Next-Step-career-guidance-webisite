import { IStudent } from "../../entities/StudentEntity";

export interface IStudentService {
    getAllStudents(): Promise<IStudent[]>;
    getStudentById(id: string): Promise<IStudent | null>;
    createStudent(student: IStudent):Promise<{ student: IStudent; accessToken: string; refreshToken: string }>;
    updateStudent(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
    exitStudent(email:string): Promise<IStudent|null>;

  }