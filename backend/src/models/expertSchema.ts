import mongoose, { Schema } from "mongoose";

const ExpertSchema: Schema = new Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true, match: /^[0-9]{10}$/ },
    profile_picture: { type: String, default: "" },
    personal_bio: { type: String, required: true },
    consultation_fee: { type: Number, required: true },
    credential: { type: String, required: true },
    education_background: { type: String, required: true },
    sub_category_id:{type:mongoose.Types.ObjectId,required:true},
    area_of_expertise: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false }, 
    role: { type: String, default: "expert" },
  },
  { timestamps: true }
);


export default ExpertSchema