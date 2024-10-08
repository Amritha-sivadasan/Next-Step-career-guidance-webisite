import { IChat } from "../../entities/ChatEntity";

export interface IChatService {
    findAllChatById(id:string):Promise<IChat[]>
    fetchChatById(id:string):Promise<IChat|null>
    createChatForBooking(studentId:string, expertId:string,bookingId:string):Promise<void>
}