export interface IBooking{
    _id: string;
    studentId: string;
    expertId: string;
    slotId:string,
    bookingStatus: string;
    subCatName: string;
    paymentAmount: number;
    paymentStatus: string;
    transactionId:string;
    paymentMethod:string
}