import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '@/shared/infra/config';
import { MiddlewareUser } from '@/shared/domain/middleware-request'

export class AuthService {
  constructor() {}

  verifyJWT(token: string, secret: string): Promise<MiddlewareUser> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as MiddlewareUser);
      });
    });
  }

  createJWT(payload: object): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, config.authentication.secret, { expiresIn: config.authentication.tokenExp }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  async comparePasswords(passwordA: string, passwordB: string): Promise<boolean> {
    console.log(passwordA, passwordB);
    return bcrypt.compare(passwordA, passwordB);
  }

  async generatePasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
