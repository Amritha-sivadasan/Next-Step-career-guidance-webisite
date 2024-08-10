export interface IStudent {
  _id: string;
  user_name: string;
  email: string;
  password?: string;
  education_level: string;
  phoneNumber: string;
  education_background: string;
  user_type: string;
  profile_picture: string;
  is_active: boolean;
  authentication_id: string;
  authentication_provider: string;
  is_data_entered:boolean;
  role: string;
}
