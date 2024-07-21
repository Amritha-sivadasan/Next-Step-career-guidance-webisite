import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

const otpSchema = Joi.object({
    email: Joi.string().email().required(),
    createdAt: Joi.date().iso(),
    context: Joi.string(),
    otp: Joi.string().required()
  });

  const validateOtp = (req: Request, res: Response, next: NextFunction) => {
   
    const { error } = otpSchema.validate(req.body);

    if (error) {
    
      return res.status(400).json({ error: error.details[0].message });
    }
  

    next();
  };
  
  export default validateOtp;
  