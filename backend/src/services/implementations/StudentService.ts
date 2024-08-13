import { IStudentService } from "../interface/IStudentService";
import { IStudent } from "../../entities/StudentEntity";
import { IStudentRepository } from "../../repositories/interface/IStudentRepository";
import StudentRepository from "../../repositories/implementations/StudentRepository";
import hashPassword from "../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";
import cloudinary from "../../config/cloudinaryConfig";


function excludePassword(expert: any): IStudent {
  const expertObj = expert.toObject();
  delete expertObj.password;
  return expertObj;
}

export default class StudentService implements IStudentService {
  private studentRepository: IStudentRepository;
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async getAllStudents(page:number,limit:number): Promise<{items: IStudent[];
    totalCount: number;
    totalPages: number;
    currentPage: number;}> {
    const students = await this.studentRepository.findAll(page,limit);
    const totalCount = await this.studentRepository.countDocuments();
    return {
      items: students.map((students) => excludePassword(students)),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    }
  }

  async getStudentById(id: string): Promise<IStudent | null> {
    const student = await this.studentRepository.findById(id);
    if (student) {
      const studentObj = student.toObject();
      delete studentObj.password;
      return studentObj;
    }
    return null;
  }

  async createStudent(
    student: IStudent
  ): Promise<{ student: IStudent; accessToken: string; refreshToken: string }> {
    try {
      const hashedPassword = hashPassword(student.password);
      const studentWithHashedPassword = {
        ...student,
        password: hashedPassword,
      };
      const newStudent = await this.studentRepository.create(
        studentWithHashedPassword
      );
      let userId = newStudent._id.toString();
      
      const accessToken = generateAccessToken(userId, "student");
      const refreshToken = generateRefreshToken(userId, "student");
      
      const newStudentObj = newStudent.toObject();
      delete newStudentObj.password;
      
      return { student: newStudentObj, accessToken, refreshToken };
    } catch (error) {
      console.log(
        "error occur in student repository while creating a student",
        error
      );
      throw error;
    }
  }

  async exitStudent(email: string): Promise<IStudent | null> {
    const student = await this.studentRepository.findOne(email);
    if (student) {
      const studentObj = student.toObject();
      delete studentObj.password;
      return studentObj;
    }
    return null;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ student: IStudent; accessToken: string; refreshToken: string }> {
    const student = await this.studentRepository.findOne(email);
    if (!student) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = bcrypt.compareSync(password, student.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const userId = student._id.toString();
    const accessToken = generateAccessToken(userId, "student");
    const refreshToken = generateRefreshToken(userId, "student");

    const studentObj = student.toObject();
    delete studentObj.password;

    return { student: studentObj, accessToken, refreshToken };
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.studentRepository.findOne(email);
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = hashPassword(newPassword);
    user.password = hashedPassword;
    const userId = user._id.toString();

    await this.studentRepository.update(userId, user);
  }

  async updateStudent(
    id: string,
    student: Partial<IStudent>
  ): Promise<IStudent | null> {
    try {
      const userExist = await this.studentRepository.findById(id);
      if (!userExist) {
        throw new Error("User not found");
      }

      const updatedData = {
        ...student,
        is_data_entered: true,
      };

      const updatedStudent = await this.studentRepository.update(id, updatedData);
      if (updatedStudent) {
        const updatedStudentObj = updatedStudent.toObject();
        delete updatedStudentObj.password;
        return updatedStudentObj;
      }
      return null;
    } catch (error) {
      console.log('error during update student', error);
      throw error;
    }
  }

  async findUserById(id: string): Promise<IStudent | null> {
    const student = await this.studentRepository.findUserById(id);
    if (student) {
      const studentObj = student.toObject();
      delete studentObj.password;
      return studentObj;
    }
    return null;
  }

    async updateStudentData(id: string, student: Partial<IStudent>,  file?: Express.Multer.File): Promise<IStudent | null> {
      try {
        const userExist = await this.studentRepository.findById(id);
        if (!userExist) {
          throw new Error("User not found");
        }
        let profile_picture = userExist.profile_picture;
        if(file){
          const result = await cloudinary.uploader.upload(file.path);
          profile_picture= result.secure_url;
        }
        const updatedData= {
          ...student,
          profile_picture
        }
        const updatedStudent= await this.studentRepository.update(id,updatedData)
        if (updatedStudent) {
          const updatedStudentObj = updatedStudent.toObject();
          delete updatedStudentObj.password;
          return updatedStudentObj;
        }
        return null;
      } catch (error) {
        console.log('error',error)
        throw error;
      }
    }
    
    async hadleBlockStudent(id:string): Promise<IStudent|null> {
      try {
        const exist= await this.studentRepository.findById(id)
        if(!exist){
        throw new Error
        }
      exist.is_active=!exist.is_active
      const response= await  this.studentRepository.update(id,exist)
    
       return response
        
      } catch (error) {
        throw error;
      }
    }
  
}
