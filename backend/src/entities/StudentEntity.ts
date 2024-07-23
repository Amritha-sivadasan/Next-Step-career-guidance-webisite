import { ObjectId ,Document} from "mongoose";

export interface IStudent  {
  [x: string]: any;
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
  is_credential_validate: Boolean;
  role: string;
}
