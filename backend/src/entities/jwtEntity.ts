import { Request as ExpressRequest } from "express";

interface TokenPayload {
  userId: string;
  role: string;
}

interface CustomRequest extends ExpressRequest {
  user?: TokenPayload;
}

export { CustomRequest };