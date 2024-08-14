import { Schema,model,Document } from "mongoose";
import { IPsychometric } from "../entities/PsychometricEntity";

    const PsychometricSchema:Schema= new Schema({
        question:{type:String,required:true},
        options: [
            {
            text: {
                type: String,
                required: true,
            },
            scores: [
                {
                  category: { type: String, required: true },
                  score: { type: Number, required: true },
                },
              ],
            },
        ],
    })

   export const Psychometric= model<IPsychometric & Document>("Psychometric",PsychometricSchema)