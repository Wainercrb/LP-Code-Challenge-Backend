import Zod from 'zod';
import { User } from '@/users/domain/user';
import { Role } from '@/users/domain/user-role';

const schema = Zod.object({
  username: Zod.string().min(3).max(30),
  password: Zod.string().min(3).max(30),
  role: Zod.enum([Role.admin, Role.guess])
});

export const validateSignUp = (body: Record<string, unknown>): User => {
  const { username, password, role } = schema.parse(body);

  return {
    id: 0,
    username,
    password,
    role,
    balance: 0,
  };
};
