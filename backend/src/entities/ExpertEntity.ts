import { ObjectId,Document } from "mongoose";

export interface IExpert extends Document {
  _id: ObjectId;
  user_name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profile_picture: string;
  personal_bio: string;
  consultation_fee: number;
  credential: string;
  education_background: string;
  subCatName: string;
  area_of_expertise: string;
  is_active: boolean;
  role: string;
  is_data_entered: Boolean;
  authentication_id: string;
  authentication_provider: string;
  is_credential_validate:CredentialStatus 
}


export enum CredentialStatus {
  Pending = 'pending',
  True = 'true',
  False = 'false'
}