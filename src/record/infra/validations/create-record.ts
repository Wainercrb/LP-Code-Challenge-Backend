import Zod from 'zod';

const schema = Zod.object({
  operation_id: Zod.number({ message: 'Operation ID is required.' }).transform((v) => Number(v)),
  valueA: Zod.number({ message: 'Value A is required.' }).transform((v) => Number(v)),
  valueB: Zod.number({ message: 'Value B is required.' }).transform((v) => Number(v)),
});

export const validateCreateRecord = (
  body: Record<string, unknown>,
): { operation_id: number; valueA: number; valueB: number } => {
  return schema.parse(body);
};
