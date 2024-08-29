import { IBooking } from "./booking";
import { IExpert } from "./expert";
import { IStudent } from "./user";

interface IAudio {
  url: string; 
  duration?: number;
}
export interface IMessage {
  _id: string;
  chatId: string|IChat;
  senderId: string;
  text?: string;
  audio?: IAudio;
  file?:string|null
  timestamp: Date;
  is_delete: boolean;
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


