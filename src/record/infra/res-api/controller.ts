import { NextFunction, Request, Response } from 'express';
import { validateGetOperation } from '@/shared/infra/validations/getOperation';
import { List } from '@/record/application/list';
import { Create } from '@/record/application/create';
import { Delete } from '@/record/application/delete';
import { MiddlewareRequest } from '@/shared/domain/middleware-request';
import { validateDeleteRecord } from '@/shared/infra/validations/delete-record';
import { validateCreateRecord } from '@/shared/infra/validations/create-record';
import { validateUserContext } from '@/shared/infra/validations/user-context';

export class Controller {
  constructor(
    private readonly list: List,
    private readonly create: Create,
    private readonly recordDelete: Delete,
  ) {}
  async createRecord(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      const { operation_id, valueA, valueB } = validateCreateRecord(req.body);
      const { id } = validateUserContext(req.user as unknown as Record<string, unknown>);

      const record = await this.create.execute(id, operation_id, valueA, valueB);

      res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      const pagination = validateGetOperation(req.query);
      const { id } = validateUserContext(req.user as unknown as Record<string, unknown>);

      const operations = await this.list.execute(id, pagination);

      res.status(200).json(operations);
    } catch (error) {
      next(error);
    }
  }

  async deleteRecord(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      const id = validateDeleteRecord(req.params);

      const record = await this.recordDelete.execute(id);

      res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  }
}
