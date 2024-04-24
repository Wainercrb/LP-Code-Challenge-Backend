import z, { ZodError } from 'zod';
import {  Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { ListRecordService } from '@domain/services/ListRecordService';
import { MiddlewareRequest } from '@infrastructure/middleware/auth.middleware';

const zodNumber = z.number();
const payload = z.object({
  page: z
    .string()
    .min(0)
    .max(10000000)
    .transform((v) => zodNumber.parse(Number(v))),
  size: z
    .string()
    .min(1)
    .max(10000000)
    .transform((v) => zodNumber.parse(Number(v))),
  criteria: z.string().optional(),
  orderColumn: z.string().optional(),
  orderDirection: z.enum(['ASC', 'DESC']).optional(),
});

export class ListRecordController {
  constructor(private service: ListRecordService) {}

  async handle(req: MiddlewareRequest, res: Response) {
    try {
      const id = req.user?.id;

      if (!id) return res.status(401).json({ message: 'No user found, authorization denied' });

      console.log(req.query)

      const { page, size, criteria, orderColumn, orderDirection } = payload.parse(req.query);

      const record = await this.service.list(id, page, size, criteria, orderColumn, orderDirection);

      return res.status(200).json(record);
    } catch (err) {
      console.log(err);
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
