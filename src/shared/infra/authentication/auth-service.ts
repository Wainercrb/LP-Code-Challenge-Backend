import { Response, NextFunction } from 'express';
import { config } from '@/shared/infra/config';
import { MiddlewareRequest } from '@/shared/domain/middleware-request';
import { JwtService } from '@/shared/infra/authentication/jwt-service';

export class AuthService extends JwtService {
  constructor() {
    super();
  }

  handleAuthentication = async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.cookies) return res.status(401).json({ message: 'No cookies found, authorization denied' });

      const { token } = req.cookies;

      if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

      const decoded = await this.verifyJWT(token, config.authentication.secret);

      if (!decoded) return res.status(401).json({ message: 'Token is not valid' });

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };
}
