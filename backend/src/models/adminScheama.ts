import { Schema } from "mongoose";

const AdminSchema: Schema = new Schema({
  user_name: { type: String, required: true },
  password: { type: String, require: true },
});

export default  AdminSchema
