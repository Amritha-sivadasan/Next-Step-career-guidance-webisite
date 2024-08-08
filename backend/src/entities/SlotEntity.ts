import { ObjectId ,Document} from "mongoose";

export interface ISlots extends Document{
    _id:ObjectId,
    consultationStartTime:string,
    consultationEndTime:string,
    consultationDate:string,
    expertId:ObjectId,
    slotStatus:string
}