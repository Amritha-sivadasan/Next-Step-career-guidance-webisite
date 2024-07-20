import { ObjectId ,Document} from "mongoose";

export interface IStudent extends Document {
  _id: ObjectId;
  user_name: String;
  email: String;
  password: String;
  education_level: String;
  phonenumber: String;
  education_background: String;
  user_type: String;
  profile_picture: String;
  is_verified: Boolean;
  is_active: Boolean;
  is_credential_validate: Boolean;
  role: String;
}
