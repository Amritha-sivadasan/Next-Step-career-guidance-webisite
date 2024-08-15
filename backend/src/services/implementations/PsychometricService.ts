import { IPsychometricService } from "../interface/IpsychometricService";
import { IPsychometricRepository } from "../../repositories/interface/IPsychometricRepository";
import { CategorySums, IPsychometric, Score } from "../../entities/PsychometricEntity";
import PsychometricRepository from "../../repositories/implementations/PsychometricRepository";
import { IStudentRepository } from "../../repositories/interface/IStudentRepository";
import StudentRepository from "../../repositories/implementations/StudentRepository";
import { IStudent } from "../../entities/StudentEntity";

export default class PsychometricService implements IPsychometricService {
  private psychometricRepositry: IPsychometricRepository;
  private studentRepositry: IStudentRepository;
  constructor() {
    this.psychometricRepositry = new PsychometricRepository();
    this.studentRepositry = new StudentRepository();
  }

  async createQuestion(question: IPsychometric): Promise<void> {
    try {
      return this.psychometricRepositry.createQuestrion(question);
    } catch (error) {
      throw error;
    }
  }

  async findAllQuestions(): Promise<IPsychometric[]> {
    try {
      const response = await this.psychometricRepositry.findAllQuestion();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteQuestion(id: string): Promise<void> {
    try {
      return this.psychometricRepositry.deletePsychometricQuestion(id);
    } catch (error) {
      throw error;
    }
  }
  async submitAnswer(id: string, answers: string[]): Promise<IStudent|null> {
    try {
      const allQuestions = await this.psychometricRepositry.findAllQuestion();
      const optionScores: Record<string, Score[]> = {};
      allQuestions.forEach((question) => {
        question.options.forEach((option) => {
          optionScores[option._id] = option.scores;
        });
      });

      const categorySums: CategorySums = {};
      answers.forEach(answerId => {
        const scores = optionScores[answerId] || [];
        scores.forEach(score => {
          if (!categorySums[score.category]) {
            categorySums[score.category] = 0;
          }
          categorySums[score.category] += score.score;
        });
      });

  const student= await this.studentRepositry.findById(id)
  if(student){
      student.psychometric_result=categorySums
      await this.studentRepositry.update(id,student!)
    }

     return student
    
    } catch (error) {
      throw error;
    }
  }
}
