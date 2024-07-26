import { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";

export const refreshTokens = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }
  try {
    const decoded = verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET!
    );
    const { userId, role } = decoded;

    const newAccessToken = generateAccessToken(userId, role);
    const newRefreshToken = generateRefreshToken(userId, role);
             
     if(role=='student') {
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
  
      res.json({ accessToken: newAccessToken });
    
     }else if(role=='expert'){
      res.cookie("ExpertRefreshToken", newRefreshToken, {
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken: newAccessToken });
     }
  
  } catch (error) {
    res
      .status(403)
      .json({ message: "Invalid or expired refresh token from verifying  " });
  }

};

