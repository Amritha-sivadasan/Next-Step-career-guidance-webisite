import { Request,Response } from "express";
import { IMessageService } from "../services/interface/IMessageService";
import MessageService from "../services/implementations/MessageService";



class MessageController {
    private messageService:IMessageService
    constructor (){
        this.messageService= new MessageService()
    }

    public saveMessage= async(req:Request,res:Response)=>{
        try {
            
         const resposne= await this.messageService.saveMessage(req.body)
            res.status(200).json({
                success: true,
                message: 'Message send successfully',
                data: resposne,
              });
            
        } catch (error) {
            console.log('error in save,message',error)
            res.status(500).json({
                message: "something went wrong on Blocking the expert",
                success: false,
              });
        }
    }
}

export default new MessageController()