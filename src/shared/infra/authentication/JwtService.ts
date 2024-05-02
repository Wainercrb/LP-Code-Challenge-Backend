import jwt from 'jsonwebtoken';
import { config } from '@/shared/infra/config';
import { MiddlewareUser } from '@/shared/domain/middleware-request';

export class JwtService {
  constructor() {}

  verifyJWT(token: string, secret: string): Promise<MiddlewareUser> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as MiddlewareUser);
      });
    });
  }

  createJWT(payload: MiddlewareUser): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, config.authentication.secret, { expiresIn: config.authentication.tokenExp }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }
}
