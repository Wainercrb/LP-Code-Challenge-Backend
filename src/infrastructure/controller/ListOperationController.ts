import z, { ZodError } from 'zod';
import { Request, Response } from 'express';
import { ValidationError } from '@domain/errors/ValidationError';
import { ListOperationService } from '@domain/services/ListOperationService';

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

export class ListOperationController {
  constructor(private service: ListOperationService) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, size, criteria, orderColumn, orderDirection } = payload.parse(req.query);

      const record = await this.service.list(page, size, criteria, orderColumn, orderDirection);

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
