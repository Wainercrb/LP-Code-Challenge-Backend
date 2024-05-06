import { NextFunction, Request, Response } from 'express';

// Shared
import { config } from '@/shared/infra/config';

// Validations
import { validatePagination } from '@/shared/infra/validations/pagination';

// Use Cases
import { ListOperation } from '@/operation/application/list-operation';

export class Controller {
  constructor(private readonly listOperation: ListOperation) {}
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = validatePagination(['cost', 'type'], 'type', req.query);

      const records = await this.listOperation.execute(pagination);

      res.status(config.server.httpStatusCode.Ok).json(records);
    } catch (error) {
      next(error);
    }
  }
}
