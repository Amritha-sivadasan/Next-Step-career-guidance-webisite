import { IStudent } from "../../entities/StudentEntity";

export interface IStudentService {
  getAllStudents(page:number,limit:number): Promise<{items: IStudent[];
    totalCount: number;
    totalPages: number;
    currentPage: number;}> 
    getStudentById(id: string): Promise<IStudent | null>;
    createStudent(student: Partial< IStudent>):Promise<{ student: IStudent; accessToken: string; refreshToken: string }>;
    updateStudent(id: string, student: Partial<IStudent>): Promise<IStudent | null>;
    exitStudent(email:string): Promise<IStudent|null>;
    login(
      email: string,
      password: string
    ): Promise<{ student: IStudent; accessToken: string; refreshToken: string }>
    findUserById(id:string):Promise<IStudent|null>
    updateStudentData(id:string,student: Partial<IStudent>,file?: Express.Multer.File):Promise<IStudent | null>
     hadleBlockStudent(id:string): Promise<IStudent|null>
  }