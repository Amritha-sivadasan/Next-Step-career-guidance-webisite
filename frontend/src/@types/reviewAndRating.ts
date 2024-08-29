export interface IReviewAndRating{
    _id?:string,
    meetingId:string,
    review:string,
    rating:number
    studentId:string,
    expertId:string,
    is_delete:boolean
}