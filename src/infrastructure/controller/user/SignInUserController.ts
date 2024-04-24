import z, { ZodError } from 'zod';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { SignInUserService } from '@domain/services/user/SignInUserService';
import { createAccessToken } from '@infrastructure/middleware/jwt/AccessToken';
import { AuthUser } from '@infrastructure/middleware/auth.middleware';

const payload = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(5).max(15),
});

export class SignInUserController {
  constructor(private service: SignInUserService) {}

  async handle(req: Request, res: Response) {
    try {
      const { username, password } = payload.parse(req.body);

      const userFound = await this.service.findByUsername(username);

      if (!userFound)
        return res.status(400).json({
          message: 'Invalid credentials',
        });

      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid credentials',
        });
      }

      const response: AuthUser = {
        id: userFound.id,
        role: userFound.role,
        username: userFound.username,
      };

      const token = await createAccessToken(response);

      res.cookie('token', token, {
        httpOnly: process.env.NODE_ENV !== 'development',
        secure: true,
        sameSite: 'none',
      });

      return res.status(200).json(response);
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }

      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.errors });
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
