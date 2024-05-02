import { NextFunction, Response } from 'express';

// Shared
import { MiddlewareRequest } from '@/shared/domain/middleware-request';
import { validateUserContext } from '@/shared/infra/validations/user-context';
import { validatePagination } from '@/shared/infra/validations/pagination';

// Use Cases
import { ListRecord } from '@/record/application/list-record';
import { CreateRecord } from '@/record/application/create-record';
import { DeleteRecord } from '@/record/application/delete-record';

// Validations
import { validateDeleteRecord } from '@/record/infra/validations/delete-record';
import { validateCreateRecord } from '@/record/infra/validations/create-record';

export class Controller {
  constructor(
    private readonly listRecord: ListRecord,
    private readonly createRecord: CreateRecord,
    private readonly deleteRecord: DeleteRecord,
  ) {}
  async create(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      const { operation_id, valueA, valueB } = validateCreateRecord(req.body);
      const { id: userID } = validateUserContext(req.user as unknown as Record<string, unknown>);

      const record = await this.createRecord.execute(userID, operation_id, valueA, valueB);

      res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  }

  async list(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      const pagination = validatePagination(req.query);
      const { id: userID } = validateUserContext(req.user as unknown as Record<string, unknown>);

      const operations = await this.listRecord.execute(userID, pagination);

      res.status(200).json(operations);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: MiddlewareRequest, res: Response, next: NextFunction) {
    try {
      const id = validateDeleteRecord(req.params);

      const record = await this.deleteRecord.execute(id);

      res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  }
}
