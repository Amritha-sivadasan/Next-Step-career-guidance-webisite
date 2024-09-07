import mongoose from "mongoose";
export let dbInstance: typeof mongoose;

export default async () => {
  try {
    console.log('mongourl ',process.env.MONGOURL)
    if (process.env.MONGOURL) {
      dbInstance = await mongoose.connect(process.env.MONGOURL, {
        tls: true,
        tlsAllowInvalidCertificates: true,
      });
      console.log("mongodb connection successulll");
    } else {
      throw new Error("MONGODB_URL not defined");
    }
  } catch (error) {
    console.log("monogdb connection failed", error);
  }
};
