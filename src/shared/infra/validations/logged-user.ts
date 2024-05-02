import Zod from 'zod';
import { Role } from '@/user/domain/user-role';
import { MiddlewareUser } from '@/shared/domain/middleware-request';

const schema = Zod.object({
  userID: Zod.number(),
  username: Zod.string(),
  role: Zod.enum([Role.admin, Role.guess]),
});

export const validateLoggedUser = (body: Record<string, unknown>): MiddlewareUser => {
  return schema.parse(body);
};
