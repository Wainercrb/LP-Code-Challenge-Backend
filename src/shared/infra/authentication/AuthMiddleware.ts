import { Response, NextFunction } from 'express';
import { config } from '@/shared/infra/config';
import { AuthService } from './AuthService';
import { MiddlewareRequest} from '@/shared/domain/middleware-request';

export const auth = async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies) return res.status(401).json({ message: 'No cookies found, authorization denied' });

    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const authService = new AuthService();

    const decoded = await authService.verifyJWT(token, config.authentication.secret);

    if (!decoded) return res.status(401).json({ message: 'Token is not valid' });

    req.user = decoded

    next();
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
