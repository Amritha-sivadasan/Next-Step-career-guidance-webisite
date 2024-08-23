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
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
         const resposne= await this.messageService.saveMessage(req.body,files)
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

    public deleteMessage = async(req:Request,res:Response):Promise<void>=>{
        const {id}= req.params
    
        try {
            const resposne= await this.messageService.deleteMessage(id!)
            res.status(200).json({
                success: true,
                message: 'Message send successfully',
                data: resposne,
              });
            
        } catch (error) {
            res.status(500).json({
                message: "something went wrong on deleting message",
                success: false,
              });
        }
    }
}

export default new MessageController()