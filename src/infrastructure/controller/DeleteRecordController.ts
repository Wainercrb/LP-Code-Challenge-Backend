import z, { ZodError } from 'zod';
import { Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { MiddlewareRequest } from '@infrastructure/middleware/auth.middleware';
import { DeleteRecordService } from '@domain/services/DeleteRecordService';
import { FindRecordService } from '@domain/services/FindRecordService';

const payload = z.object({
  record_id: z.string().transform((v) => Number(v)),
});

export class DeleteRecordController {
  constructor(
    private deleteRecordService: DeleteRecordService,
    private findRecordService: FindRecordService,
  ) {}

  async handle(req: MiddlewareRequest, res: Response) {
    try {
      const { record_id } = payload.parse(req.query);

      const foundRecord = await this.findRecordService.find(record_id);

      if (!foundRecord) return res.status(404).json({ message: 'Record not found' });

      const deletedRecord = await this.deleteRecordService.delete(record_id);

      return res.status(201).json({ deletedRecord });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.errors });
      }

      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
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
