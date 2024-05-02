import { NextFunction, Request, Response } from 'express';

// Config
import { config } from '@/shared/infra/config';

// Shared
import { MiddlewareRequest } from '@/shared/domain/middleware-request';
import { validateUserContext } from '@/shared/infra/validations/user-context';

// Use Cases
import { GetUser } from '@/user/application/get-user';
import { SignUpUser } from '@/user/application/sign-up-user';
import { SignInUser } from '@/user/application/sign-in-user';
import { VerifyUser } from '@/user/application/verify-user';

// Validations
import { validateSignIn } from '@/user/infra/validations/sign-in';
import { validateSignUp } from '@/user/infra/validations/sign-up';

export class Controller {
  constructor(
    private readonly signUpUser: SignUpUser,
    private readonly signInUser: SignInUser,
    private readonly getUser: GetUser,
    private readonly verifyUser: VerifyUser,
  ) {}
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = validateSignIn(req.body);

      const { token, user } = await this.signInUser.execute(username, password);

      res.cookie('token', token, {
        httpOnly: config.server.isDevMode,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, role } = validateSignUp(req.body);

      const { token, user } = await this.signUpUser.execute(username, password, role);

      res.cookie('token', token, {
        httpOnly: config.server.isDevMode,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie('token', '', {
        httpOnly: config.server.isDevMode,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
      });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      const { id: userID } = validateUserContext(req.user as unknown as Record<string, unknown>);

      const user = await this.getUser.execute(userID);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async verify(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      if (!req.cookies) return res.status(401).json({ message: 'No cookies found, authorization denied' });

      const { token } = req.cookies;

      const user = await this.verifyUser.execute(token);

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}
