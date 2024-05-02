import Zod from 'zod';

const schema = Zod.object({
  id: Zod.string().transform((v) => Number(v)),
});

export const validateDeleteRecord = (body: Record<string, unknown>): number => {
  const { id } = schema.parse(body);
  return id;
};
