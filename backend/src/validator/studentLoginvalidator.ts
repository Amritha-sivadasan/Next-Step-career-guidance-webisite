import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

const studentSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
})

const validateStudentLogin=(req:Request,res:Response,next:NextFunction)=>{
    const { error } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
}

export default validateStudentLogin