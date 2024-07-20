import { Request, Response } from "express";
import StudentService from "../services/implementations/StudentService";

 class StudentController {
   
    private studentService: StudentService;

    constructor() {
      this.studentService = new StudentService();
    }
  
    public createStudent = async (req: Request, res: Response): Promise<void> => {
        try {
          const newStudent = await this.studentService.createStudent(req.body);
          res.status(201).json(newStudent);
        } catch (error) {
          res.status(500).json({ message: 'Server error', error });
        }
      };
}

export default new StudentController(); 