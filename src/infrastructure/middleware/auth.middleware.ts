import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET } from './config';

export interface AuthUser {
    username: string
    role: string
    id: number
}

export interface MiddlewareRequest extends Request {
  user?: AuthUser;
}

export const auth = (req: MiddlewareRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies) return res.status(401).json({ message: 'No cookies found, authorization denied' });

    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    jwt.verify(token, SECRET, (error: VerifyErrors | null, user: unknown) => {
      if (error) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
      
      req.user = user as AuthUser;
      
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
