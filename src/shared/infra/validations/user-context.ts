import Zod from 'zod';
import { User } from '@/users/domain/user';
import { Role } from '@/users/domain/user-role';

const schema = Zod.object({
  id: Zod.number(),
  username: Zod.string(),
  role: Zod.enum([Role.admin, Role.guess]),
});

export const validateUserContext = (body: Record<string, unknown>): User => {
  const { id, username, role } = schema.parse(body);

  return {
    id,
    username,
    role: role as Role,
    balance: 0,
    password: '',
  };
};
