import { ObjectId, Document } from 'mongoose';


export interface Score {
  category: string;  
  score: number;     
}

export interface Option {
  text: string;      
  scores: Score[];   
}

export interface IPsychometric extends Document {
  _id: ObjectId;     
  question: string;  
  options: Option[]; 
}
