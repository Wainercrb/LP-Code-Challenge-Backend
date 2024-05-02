import { NextFunction, Response } from 'express';
import { validateUserContext } from '@/shared/infra/validations/user-context';
import { GetUserUseCase } from '@/user/application/get';
import { MiddlewareRequest } from '@/shared/domain/middleware-request'

export class VerifyController {
  constructor(private readonly getUseCase: GetUserUseCase) {}
  async handle(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {

      const { id } = validateUserContext(req.user as unknown as Record<string, unknown>);
      
      const user = await this.getUseCase.execute(id);

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}
