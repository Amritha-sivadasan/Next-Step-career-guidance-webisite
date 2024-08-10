import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

const studentSchema = Joi.object({
  user_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).optional(),
  education_level: Joi.string().optional(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/).optional()
    ,
  education_background: Joi.string().optional(),
  user_type: Joi.string().optional(),
  profile_picture: Joi.string().optional(),
  is_verified: Joi.boolean().optional(),
  is_active: Joi.boolean().optional(),
  is_credential_validate: Joi.boolean().optional(),
  role: Joi.string().optional().default("student"),
});

const validateStudentRegister= (req: Request, res: Response, next: NextFunction) => {
  
      const { error } = studentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      next();
  };
  
  export default validateStudentRegister;