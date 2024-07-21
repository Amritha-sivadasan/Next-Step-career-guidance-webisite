import { Schema, model,Document } from "mongoose";
import { IStudent } from "../entities/StudentEntity";

const StudentSchema: Schema = new Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String,  },
    education_level: { type: String,  },
    phonenumber: { type: String,  match: /^[0-9]{10}$/ },
    education_background: { type: String, },
    user_type: { type: String,},
    profile_picture: { type: String, default: "" },
    is_active: { type: Boolean, default: true },
    is_credential_validate: { type: Boolean, default: false },
    role: { type: String, default: "student" },
  },
  { timestamps: true }
);

const Student = model<IStudent & Document>("Student", StudentSchema);

export { Student}
