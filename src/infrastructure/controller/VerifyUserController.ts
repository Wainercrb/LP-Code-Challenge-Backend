import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { AuthUser, MiddlewareRequest } from '@infrastructure/middleware/auth.middleware';
import { SECRET } from '@infrastructure/middleware/config';
import { FindUserService } from '@domain/services/FindUserService';

export class VerifyUserController {
  constructor(private service: FindUserService) {}

  async handle(req: MiddlewareRequest, res: Response) {
    try {
      if (!req.cookies) return res.status(401).json({ message: 'No cookies found, authorization denied' });
      const { token } = req.cookies;

      jwt.verify(token, SECRET, async (error: VerifyErrors | null, user: unknown) => {
        if (error) {
          return res.status(401).json({ message: 'Token is not valid' });
        }

        const { id } = user as AuthUser;

        const userFound = await this.service.find(id);

        if (!userFound) return res.sendStatus(401);

        return res.json({
          id: userFound.id,
          username: userFound.username,
          role: userFound.role,
        });
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }

      return res
        .status(500)
        .json({
          error: 'Error processing your request, please check the logs',
        })
        .end();
    }
  }
}
