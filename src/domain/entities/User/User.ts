export enum Role {
  guess = 'guess',
  admin = 'admin',
}

export abstract class User {
  private username: string;
  private password: string;
  private balance: number;
  private role: Role;

  constructor(username: string, password: string, role: Role, balance: number) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.balance = balance;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): Role {
    return this.role;
  }

  getBalance(): number {
    return this.balance;
  }
}
