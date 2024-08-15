
import { ObjectId ,Document} from "mongoose";
export interface IPsychometricResult {
  [category: string]: number; 
}

export interface IStudent extends Document  {

  _id: ObjectId;
  user_name: string;
  email: string;
  password: string;
  education_level: string;
  phoneNumber: string;
  education_background: string;
  user_type: string;
  profile_picture: string;
  is_active: Boolean;
  is_data_entered:Boolean
  authentication_id:string,
  authentication_provider:string
  role: string;
  psychometric_result?: IPsychometricResult
   
  
}
