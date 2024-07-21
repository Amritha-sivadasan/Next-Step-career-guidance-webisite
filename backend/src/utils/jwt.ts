import jwt from "jsonwebtoken";

interface TokenPayload {
    userId: string;
    role: string;
  }
  
  const generateAccessToken = (userId: string, role: string) => {
    const payload: TokenPayload = { userId, role };
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    });
  };
  
  const generateRefreshToken = (userId: string, role: string) => {
    const payload: TokenPayload = { userId, role };
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
    });
  };
  
  const verifyToken = (token: string, secret: string): TokenPayload => {
    try {      
      const decoded = jwt.verify(token, secret) as TokenPayload;
      return decoded;
    } catch (error) {
  
      console.error('Token Verification Error:', error);
      throw new Error('Invalid or expired token');
    }
  };
  
  export { generateAccessToken, generateRefreshToken, verifyToken };
  