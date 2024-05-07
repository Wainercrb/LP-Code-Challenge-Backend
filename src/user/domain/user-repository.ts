import { User } from '@/user/domain/user';
import { Role } from '@/user/domain/user-role';
import { Transaction } from 'sequelize';

export interface UserRepository {
  getOneByUsername(username: string, t?: Transaction): Promise<User | null>;
  getOneById(id: number, t?: Transaction): Promise<User | null>;
  updateBalanceById(id: number, balance: number, t?: Transaction): Promise<[affectedCount: number ]>;
  createUser(username: string, password: string, Role: Role, balance: number, t?: Transaction): Promise<User>;
  updateUser(id: number, username: string, Role: Role, balance: number, t?: Transaction): Promise<[affectedCount: number ]>;
}
