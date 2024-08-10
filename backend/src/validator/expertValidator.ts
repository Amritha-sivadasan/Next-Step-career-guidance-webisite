import Joi from "joi";
import { Request, Response, NextFunction } from "express";
const expertSchema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).optional(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/).optional(),
    profile_picture: Joi.string().optional(),
    personal_bio: Joi.string().optional(),
    consultation_fee: Joi.number().optional(),
    credential: Joi.string().optional(),
    education_background: Joi.string().optional(),
    sub_category_id: Joi.string().optional(), // Adjust this if you're using ObjectId
    area_of_expertise: Joi.string().optional(),
    is_active: Joi.boolean().optional(),
    role: Joi.string().valid('expert').default('expert'),
  });
  const validateExpert = (req: Request, res: Response, next: NextFunction) => {
    const { error } = expertSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    next();
  };
  
  export default validateExpert;