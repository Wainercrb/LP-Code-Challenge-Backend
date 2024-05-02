import { NextFunction, Request, Response } from 'express';
import { validateGetOperation } from '@/shared/infra/validations/getOperation';
import { List } from '@/operations/application/list';

export class Controller {
  constructor(private readonly list: List) {}
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagination = validateGetOperation(req.query);

      const records = await this.list.execute(pagination);

      res.status(200).json(records);
    } catch (error) {
      next(error);
    }
  }
}
