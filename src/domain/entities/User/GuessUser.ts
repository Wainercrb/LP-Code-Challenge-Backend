import { Role, User } from '@domain/entities/User/User';

export class GuessUser extends User {
  constructor(username: string, password: string, balance: number) {
    super(username, password, Role.guess, balance);
  }
}
