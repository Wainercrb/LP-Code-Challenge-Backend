import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

export async function createAccessToken(payload: object) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
