import Zod from 'zod';
import { User } from '@/user/domain/user';
import { Role } from '@/user/domain/user-role';

const schema = Zod.object({
  username: Zod.string().min(3).max(30),
  password: Zod.string().min(3).max(30),
});

export const validateSignIn = (body: Record<string, unknown>): User => {
  const { username, password } = schema.parse(body);

  return {
    id: 0,
    username,
    password,
    role: '' as Role,
    balance: 0,
  };
};
