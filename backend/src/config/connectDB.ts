import mongoose from "mongoose";
export let dbInstance: typeof mongoose;

export default async () => {
  try {
    if (process.env.MONGOURL) {
      dbInstance = await mongoose.connect(process.env.MONGOURL);
      console.log("mongodb connection successulll");
    }else {
        throw new Error("MONGODB_URL not defined")
    }
  } catch (error) {
    console.log('monogdb connection failed',error);
  }
};
