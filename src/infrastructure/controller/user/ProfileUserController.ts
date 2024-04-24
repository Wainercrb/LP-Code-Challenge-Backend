import { Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { MiddlewareRequest } from '@infrastructure/middleware/auth.middleware';
import { FindUserService } from '@domain/services/user/FindUserService';

export class ProfileUserController {
  constructor(private service: FindUserService) {}

  async handle(req: MiddlewareRequest, res: Response) {
    try {
      const id = req.user?.id;

      if (!id) return res.status(401).json({ message: 'No user found, authorization denied' });

      const userFound = await this.service.find(id);

      if (!userFound) return res.sendStatus(401);

      return res.status(200).json({
        id: userFound.id,
        username: userFound.username,
        role: userFound.role,
        balance: userFound.balance,
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
