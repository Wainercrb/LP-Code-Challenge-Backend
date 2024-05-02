import { Role } from '@/users/domain/user-role';

export abstract class User {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly password: string,
    readonly role: Role,
    readonly balance: number,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.balance = balance;
  }
}
