import { IExpert } from "./expert"
import { IStudent } from "./user"
import { IvidoeCall } from "./videoCall"

export interface IReviewAndRating{
    _id?:string,
    meetingId:string|IvidoeCall,
    review:string,
    rating:number
    studentId:string|IStudent,
    expertId:string|IExpert,
    is_delete:boolean
}