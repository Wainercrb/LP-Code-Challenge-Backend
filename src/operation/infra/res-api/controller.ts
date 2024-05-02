import { NextFunction, Request, Response } from 'express';

// Shared
import { validateGetOperation } from '@/shared/infra/validations/getOperation';

// Use Cases
import { ListOperation } from '@/operation/application/list-operation';

export class Controller {
  constructor(private readonly listOperation: ListOperation) {}
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = validateGetOperation(req.query);

      const records = await this.listOperation.execute(pagination);

      res.status(200).json(records);
    } catch (error) {
      next(error);
    }
  }
}
