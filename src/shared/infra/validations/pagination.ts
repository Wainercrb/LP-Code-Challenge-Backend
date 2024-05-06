import Zod from 'zod';
import { PaginationOrder, PaginationProps } from '@/shared/domain/pagination';

const schema = Zod.object({
  page: Zod.string({ message: 'Pagination page required.' })
    .min(1)
    .transform((v) => Number(v)),
  size: Zod.string({ message: 'Pagination size required.' })
    .min(1)
    .transform((v) => Number(v)),
  criteria: Zod.string().optional(),
  direction: Zod.enum(PaginationOrder).default('ASC'),
});

function validatePagination(
  mappedPaginationColumnList: [string, ...string[]],
  mappedPaginationDefaultColumn: string,
  body: Record<string, unknown>,
): PaginationProps {
  const columnSchema = Zod.object({
    column: Zod.enum(mappedPaginationColumnList).default(mappedPaginationDefaultColumn as string),
  });

  const mergedSchema = schema.merge(columnSchema);

  return mergedSchema.parse(body);
}

export { validatePagination };
