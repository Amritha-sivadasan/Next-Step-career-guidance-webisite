import { IStudentRepository } from "../interface/IStudentRepository";
import { IStudent } from "../../entities/StudentEntity";
import { Student } from "../../models/studentSchema";

export default class StudentRepository implements IStudentRepository {
  async findById(id: string): Promise<IStudent | null> {
    try {
      const existingStudent = await Student.findById(id);
      if (!existingStudent) {
        throw new Error("Student not found");
      }
      return existingStudent;
    } catch (error) {
      console.log("Error occurred in find byid repository", error);
      throw error;
    }
  }
  async update(
    id: string,
    student: Partial<IStudent>
  ): Promise<IStudent | null> {
    try {
      const existingStudent = await Student.findById(id);
      if (!existingStudent) {
        throw new Error("Student not found");
      }
      existingStudent.set(student);
      const updatedStudent = await existingStudent.save();

      return updatedStudent;
    } catch (error) {
      console.log("Error occurred in update repository", error);
      throw error;
    }
  }
  async findAll(): Promise<IStudent[]> {
    return Student.find();
  }
  async findOne(email: string): Promise<IStudent | null> {
    return Student.findOne({ email });
  }
  async findUserById(authentication_id: string): Promise<IStudent | null> {
    return Student.findOne({ authentication_id });
  }

  async create(student: Partial<IStudent>): Promise<IStudent> {
    try {
  
      const newStudent = new Student(student);
      return newStudent.save();
    } catch (error) {
      console.log("Error occur in create repository", error);
      throw error;
    }
  }
}
