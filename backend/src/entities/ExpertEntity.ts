import { ObjectId } from "mongoose";

export interface IExpert  {
    _id: ObjectId;
    user_name: string;
    email: string;
    password: string;
    phonenumber: string;
    profile_picture: string;
    personal_bio: string;
    consultation_fee: number;
    credential: string;
    education_background: string;
    sub_category_id: ObjectId;
    area_of_expertise: string;
    is_active: boolean;
    role: string;
  }
