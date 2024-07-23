import { IStudentService } from "../interface/IStudentService";
import { IStudent } from "../../entities/StudentEntity";
import { IStudentRepository } from "../../repositories/interface/IStudentRepository";
import StudentRepository from "../../repositories/implementations/StudentRepository";
import hashPassword from "../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";

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

      const userId = newStudent._id.toString();
      const accessToken = generateAccessToken(userId, "student");
      const refreshToken = generateRefreshToken(userId, "student");

      return { student: newStudent, accessToken, refreshToken };
    } catch (error) {
      console.log("error occur in student repository while creating a student",error);

      throw error;
    }
  }

  async exitStudent(email: string): Promise<IStudent | null> {
    return this.studentRepository.findOne(email);
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

    return { student, accessToken, refreshToken };
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
    return this.studentRepository.update(id, student);
  }
}
