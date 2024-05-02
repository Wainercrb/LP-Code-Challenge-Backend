import { NextFunction, Request, Response } from 'express';
import { config } from '@/shared/infra/config';
import { MiddlewareRequest } from '@/shared/domain/middleware-request';
import { GetUserUseCase } from '@/users/application/get';
import { SignUpUseCase } from '@/users/application/signup';
import { SignInUseCase } from '@/users/application/signin';
import { validateSignIn } from '@/shared/infra/validations/sign-in';
import { validateUserContext } from '@/shared/infra/validations/user-context';
import { validateSignUp } from '@/shared/infra/validations/sign-up';
import { VerifyUseCase } from '@/users/application/verify';

export class Controller {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly getUseCase: GetUserUseCase,
    private readonly verifyUseCase: VerifyUseCase,
  ) {}
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = validateSignIn(req.body);

      const { token, user } = await this.signInUseCase.execute(username, password);

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

      const { token, user } = await this.signUpUseCase.execute(username, password, role);

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
      const { id } = validateUserContext(req.user as unknown as Record<string, unknown>);

      const user = await this.getUseCase.execute(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async verify(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {

      if (!req.cookies) return res.status(401).json({ message: 'No cookies found, authorization denied' });
      
      const { token } = req.cookies;

      const user = await this.verifyUseCase.execute(token);

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}
