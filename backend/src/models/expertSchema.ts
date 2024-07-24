import mongoose, { Schema ,model,Document } from "mongoose";
import { IExpert } from "../entities/ExpertEntity";

const ExpertSchema: Schema = new Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String,  },
    phonenumber: { type: String,  match: /^[0-9]{10}$/ },
    profile_picture: { type: String, default:""},
    personal_bio: { type: String, },
    consultation_fee: { type: Number,  },
    credential: { type: String,  },
    education_background: { type: String, },
    sub_category_id:{type:mongoose.Types.ObjectId,},
    area_of_expertise: { type: String,  },
    is_active: { type: Boolean, default: false }, 
    role: { type: String, default: "expert" },
    is_credential_validate: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const Expert=model<IExpert & Document>('Expert',ExpertSchema)

export {Expert}