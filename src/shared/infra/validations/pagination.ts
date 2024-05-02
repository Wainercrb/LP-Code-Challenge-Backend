import Zod from 'zod';
import { PaginationOrder, PaginationProps } from '@/shared/domain/pagination';

const schema = Zod.object({
  page: Zod.string()
    .min(1)
    .transform((v) => Number(v)),
  size: Zod.string()
    .min(1)
    .transform((v) => Number(v)),
  criteria: Zod.string().optional(),
  column: Zod.enum(['cost', 'type']).default('type'),
  direction: Zod.enum(PaginationOrder).default('ASC'),
});

export const validatePagination = (body: Record<string, unknown>): PaginationProps => {
  return schema.parse(body);
};
