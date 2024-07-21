import { IStudentRepository } from "../interface/IStudentRepository";
import { IStudent } from "../../entities/StudentEntity";
import { Student } from "../../models/studentSchema";


export default class StudentRepository implements IStudentRepository {
async  findById(id: string): Promise<IStudent | null> {
      throw new Error("Method not implemented.");
  }
 async update(id: string, student: Partial<IStudent>): Promise<IStudent | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<IStudent[]> {
    return Student.find();
  }
 async findOne(email:string):Promise<IStudent|null>{
     return Student.findOne({email})
  }
  
  async create(student: IStudent): Promise<IStudent> {
  try {
    const newStudent = new Student(student);
    return newStudent.save();
    
  } catch (error) {
    console.log('Error occur in create repository');
    throw error
    
  }
   
  }
  }

