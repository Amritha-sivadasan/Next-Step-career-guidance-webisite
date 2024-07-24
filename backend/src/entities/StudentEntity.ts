import { ObjectId ,Document} from "mongoose";

export interface IStudent  {

  _id: ObjectId;
  user_name: string;
  email: string;
  password: string;
  education_level: string;
  phonenumber: string;
  education_background: string;
  user_type: string;
  profile_picture: string;
  is_active: Boolean;

  authentication_id:string,
  authentication_provider:string
  role: string;
  
}
