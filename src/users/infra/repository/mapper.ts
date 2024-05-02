import { User } from '@/users/domain/user';
import { Role } from '@/users/domain/user-role';
import { SequelizeUser } from '@/shared/infra/database/models/User';

export const toSingleUser = ({ id, username, password, role, balance }: SequelizeUser): User => {
  return {
    id,
    username,
    password,
    role: role as Role,
    balance: balance,
  };
};

export const toUserList = (rows: SequelizeUser[]): User[] => {
  return rows.map(toSingleUser);
};
