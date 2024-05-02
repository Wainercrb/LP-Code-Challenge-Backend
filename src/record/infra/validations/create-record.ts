import Zod from 'zod';

const schema = Zod.object({
  operation_id: Zod.number().transform((v) => Number(v)),
  valueA: Zod.number().transform((v) => Number(v)),
  valueB: Zod.number().transform((v) => Number(v)),
});

export const validateCreateRecord = (
  body: Record<string, unknown>,
): { operation_id: number; valueA: number; valueB: number } => {
  return schema.parse(body);
};
