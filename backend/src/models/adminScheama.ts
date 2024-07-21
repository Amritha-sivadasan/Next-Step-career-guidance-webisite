import { Schema, model, Document } from "mongoose";
import { IAdmin } from "../entities/AdminEntity";

const AdminSchema: Schema = new Schema({
  user_name: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

const Admin = model<IAdmin & Document>("Admin", AdminSchema);
export { Admin };
