import jwt from 'jsonwebtoken';
import { AuthUser } from '../auth.middleware';

export async function jwtVerify(token: string, secret: string): Promise<AuthUser> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as AuthUser);
    });
  });
}
