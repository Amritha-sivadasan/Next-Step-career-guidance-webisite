import { IBooking } from "./booking";
import { IExpert } from "./expert";
import { IStudent } from "./user";

export interface IAudio {
  url: string; 
  duration?: number;
}
export interface IMessage {
  _id: string;
  chatId: string|IChat;
  senderId: string;
  text?: string;
  audio?: IAudio|Blob ;
  file?:string|null
  timestamp: Date;
  is_delete: boolean;
  status:string
}

export interface IChat {
  _id: string;
  studentId: string|IStudent;
  expertId: string|IExpert;
  messages?: string[];
  latestMessage?:string |IMessage;
  bookingId:string|IBooking;
  createdAt:string
}


