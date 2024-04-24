import { Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { MiddlewareRequest } from '@infrastructure/middleware/auth.middleware';

export class SignOutUserController {
  constructor() {}

  async handle(req: MiddlewareRequest, res: Response) {
    try {
      res.cookie('token', '', {
        httpOnly: process.env.NODE_ENV !== 'development',
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
      });
      return res.sendStatus(200);
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
