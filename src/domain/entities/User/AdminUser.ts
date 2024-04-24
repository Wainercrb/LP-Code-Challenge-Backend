import { Role, User } from '@domain/entities/User/User';

export class AdminUser extends User {
  constructor(username: string, password: string, balance: number) {
    super(username, password, Role.admin, balance);
  }
}
