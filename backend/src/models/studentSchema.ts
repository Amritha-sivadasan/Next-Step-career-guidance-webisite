import { Schema, model } from "mongoose";
import { IStudent } from "../entities/StudentEntity";

const StudentSchema: Schema = new Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    education_level: { type: String, required: true },
    phonenumber: { type: String, required: true, match: /^[0-9]{10}$/ },
    education_background: { type: String, required: true },
    user_type: { type: String, required: true },
    profile_picture: { type: String, default: "" },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    is_credential_validate: { type: Boolean, default: false },
    role: { type: String, default: "student" },
  },
  { timestamps: true }
);

const Student = model<IStudent>("Student", StudentSchema);

export { Student}
