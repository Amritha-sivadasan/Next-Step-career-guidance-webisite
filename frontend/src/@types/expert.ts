export interface IExpert {
    _id: string;
    user_name: string;
    email: string;
    password: string;
    phoneNumber: string;
    profile_picture: string;
    personal_bio: string;
    consultation_fee: number;
    credential: File |string;
    educationBackground: string;
    subCatName: string;
    area_of_expertise: string;
    is_active: boolean;
    role: string;
    is_data_entered: boolean;
    authentication_id: string;
    authentication_provider: string;
    is_credential_validate:string
  }
  