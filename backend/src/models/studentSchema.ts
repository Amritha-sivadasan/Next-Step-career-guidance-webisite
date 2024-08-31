import { Schema, model,Document } from "mongoose";
import { IStudent } from "../entities/StudentEntity";


const StudentSchema: Schema = new Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String,  },
    education_level: { type: String,  },
    phoneNumber: { type: String,  match: /^[0-9]{10}$/ },
    education_background: { type: String, },
    user_type: { type: String,},
    profile_picture: { type: String, default: "/dummyprofile.jpg" },
    is_active: { type: Boolean, default: true },  
    role: { type: String, default: "student" },
    authentication_id: { type: String},
    authentication_provider: { type: String },
    is_data_entered:{type:Boolean,default:false},
    psychometric_result: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

const Student = model<IStudent & Document>("Student", StudentSchema);

export { Student}
