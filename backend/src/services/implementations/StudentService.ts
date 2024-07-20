import { IStudentService } from "../interface/IStudentService";
import { IStudent } from "../../entities/StudentEntity";
import { IStudentRepository } from "../../repositories/interface/IStudentRepository";
import StudentRepository from "../../repositories/implementations/StudentRepository";

export default class StudentService implements IStudentService {
  private studentRepository: IStudentRepository;
  constructor() {
    this.studentRepository = new StudentRepository();
  }
  async getAllStudents(): Promise<IStudent[]> {
    return this.studentRepository.findAll();
  }

  async getStudentById(id: string): Promise<IStudent | null> {
    return this.studentRepository.findById(id);
  }

  async createStudent(student: IStudent): Promise<IStudent> {
    return this.studentRepository.create(student);
  }

  async updateStudent(id: string, student: Partial<IStudent>): Promise<IStudent | null> {
    return this.studentRepository.update(id, student);
  }


}
