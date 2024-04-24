import z, { ZodError } from 'zod';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { CreateUserService } from '@domain/services/CreateUserService';
import { Role } from '@domain/entities/User/User';
import { SignInUserService } from '@domain/services/SignInUserService';
import { createAccessToken } from '@infrastructure/middleware/jwt/AccessToken';
import { AuthUser } from '@infrastructure/middleware/auth.middleware';

const payload = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(5).max(15),
  role: z.enum([Role.admin, Role.guess]),
});

export class CreateUserController {
  constructor(
    private service: CreateUserService,
    private signInService: SignInUserService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { username, password, role } = payload.parse(req.body);

      const userFound = await this.signInService.findByUsername(username);

      if (userFound)
        return res.status(400).json({
          message: 'The email is already in use',
        });

      const passwordHash = await bcrypt.hash(password, 10);

      const userSaved = await this.service.create(username, passwordHash, role);

      const response: AuthUser = {
        id: userSaved.id,
        role: userSaved.role,
        username: userSaved.username,
      };

      const token = await createAccessToken(response);

      res.cookie('token', token, {
        httpOnly: process.env.NODE_ENV !== 'development',
        secure: true,
        sameSite: 'none',
      });

      return res.status(201).json(response);
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
