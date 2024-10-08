import { Request, Response } from "express";
import Stripe from "stripe";
import { IBookingService } from "../services/interface/IBookingService";
import BookingService from "../services/implementations/BookingService";
import ChatService from "../services/implementations/ChatService";
import { IChatService } from "../services/interface/IChatService";
import { ISlotService } from "../services/interface/ISlotService";
import SlotService from "../services/implementations/SlotService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret =process.env.STRIPE_WEBHOOK_SECRET as string|| process.env.WEBHOOK_LOCAL_SECRET as string 




const bookingService: IBookingService = new BookingService();
const chatService :IChatService= new ChatService()
const slotService:ISlotService= new SlotService()


export default async (req: Request, res: Response) => {
  console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET);

console.log('Headers:', req.headers);
console.log('Raw request body:', req.body);


  const sig = req.headers["stripe-signature"] as string | string[] | Buffer;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error: any) {
    console.log("error in webhook", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const sessionCompleted = event.data.object as Stripe.Checkout.Session;
      const bookingId = sessionCompleted.metadata?.bookingId as string
      const studentId=sessionCompleted.metadata?.studentId as string
      const expertId=sessionCompleted.metadata?.expertId as string
       const slotId= sessionCompleted.metadata?.slotId as string
       const reason =sessionCompleted.metadata?.reason

       const exitbooking= await bookingService.getBookingById(bookingId)
      
      if(exitbooking?.bookingStatus =="pending"){
        await bookingService.updateBookingStatus(bookingId,"confirmed")
        await bookingService.updateBookingPaymentStatus(bookingId!, "completed");
        await chatService.createChatForBooking(studentId,expertId,bookingId)
        await slotService.update(slotId,"confirmed")
      }
      if(exitbooking?.bookingStatus=="confirmed"){
        await bookingService.updateBookingStatus(bookingId,"cancelled",reason)
        await bookingService.updateBookingPaymentStatus(bookingId!, "refund");
        console.log('booking refund')
      }
      
      
   
    

      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
      const bookingIdSucceeded = paymentIntentSucceeded.metadata;
      console.log("bookingIdSucceeded", bookingIdSucceeded);
      //  await  bookingService.updateBookingPaymentStatus(bookingIdSucceeded,'completed')
      break;

    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
      // const bookingId = paymentIntentFailed.metadata.bookingId;
      // console.log("PaymentIntent failed:", paymentIntentFailed);
      // await  bookingService.updateBookingPaymentStatus(bookingId,'failed')

      break;

    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      // console.log("Charge succeeded:", chargeSucceeded);
      break;

    case "charge.failed":
      const chargeFailed = event.data.object;
      // console.log("Charge failed:", chargeFailed);

      break;

    case "payment_intent.created":
      const paymentIntentCreated = event.data.object;
      // console.log("PaymentIntent created:", paymentIntentCreated);
      break;

    case "charge.updated":
      const chargeUpdated = event.data.object;
      // console.log("Charge updated:", chargeUpdated);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
};
