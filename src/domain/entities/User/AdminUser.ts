import { Role, User } from "@domain/entities/User/User";

export class AdminUser extends User {
  constructor(email: string, password: string, balance: number) {
    super(email, password, Role.admin, balance);

  }
}