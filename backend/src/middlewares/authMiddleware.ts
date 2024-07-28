import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { CustomRequest, TokenPayload } from "../entities/jwtEntity";

export const verifyAccessToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }
  try {
    const decoded = verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
    req.user = decoded as TokenPayload;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};

export const verifyRefreshToken = (tokenName: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies[tokenName];

    if (!token) {
      return res.status(401).json({ message: `${tokenName} is missing` });
    }
    try {
      const decoded = verifyToken(token, process.env.JWT_REFRESH_TOKEN_SECRET!);
      req.user = decoded;
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }
  };
};

export const verifyRole = (requiredRole: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: `Access denied. Required role: ${requiredRole}` });
    }

    next();
  };
};
