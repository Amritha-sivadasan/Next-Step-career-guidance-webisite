import { IBooking } from "./booking";
import { IExpert } from "./expert";
import { IStudent } from "./user";

export interface IMessage {
  _id: string;
  chatId: string;
  senderId: string;
  text?: string;
  audio?: string;
  timestamp: Date;
  is_delete: boolean;
}

export interface IChat {
  _id: string;
  studentId: string|IStudent;
  expertId: string|IExpert;
  messages?: string[];
  latestMessage?:string |IMessage;
  bookingId:string|IBooking
}


