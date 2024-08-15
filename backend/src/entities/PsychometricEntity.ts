import { ObjectId, Document } from 'mongoose';


export interface Score {
  category: string;  
  score: number;     
}

export interface Option {
  _id:string;
  text: string;      
  scores: Score[];   
}

export interface IPsychometric extends Document {
  _id: ObjectId;     
  question: string;  
  options: Option[]; 
}
export interface CategorySums {
  [category: string]: number;
}