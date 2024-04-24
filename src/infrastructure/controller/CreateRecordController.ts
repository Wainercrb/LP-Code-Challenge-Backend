import z, { ZodError } from 'zod';
import { Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { CreateRecordService } from '@domain/services/CreateRecordService';
import { FindUserService } from '@domain/services/FindUserService';
import { FindOperationService } from '@domain/services/FindOperationService';
import { UpdateUserService } from '@domain/services/UpdateUserService';
import { MiddlewareRequest } from '@infrastructure/middleware/auth.middleware';

const payload = z.object({
  operation_id: z.number(),
  id: z.number(),
  operationPayload: z
    .object({
      valueA: z.number(),
      valueB: z.number(),
    })
    .optional(),
});

export class CreateRecordController {
  constructor(
    private createRecordService: CreateRecordService,
    private findUserService: FindUserService,
    private findOperationsService: FindOperationService,
    private updateUserService: UpdateUserService,
  ) {}

  async handle(req: MiddlewareRequest, res: Response) {
    try {
      const { operation_id, id: user_id, operationPayload } = payload.parse({ ...req.body, ...req.user });

      const foundUser = await this.findUserService.find(user_id);

      if (!foundUser) return res.status(404).json({ message: 'User not found' });

      const foundOperation = await this.findOperationsService.find(operation_id);

      if (!foundOperation) return res.status(404).json({ message: 'Operation not found' });

      const newUserBalance = foundUser.balance - foundOperation.cost;

      if (newUserBalance <= 0) return res.status(400).json({ message: 'Your balance is negative' });

      const newRecord = await this.createRecordService.create(
        foundUser,
        foundOperation,
        newUserBalance,
        operationPayload,
      );

      const updatedUser = await this.updateUserService.update(
        foundUser.username,
        foundUser.role,
        newUserBalance,
        foundUser.id,
      );

      return res.status(201).json({ newRecord, updatedUser });
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
