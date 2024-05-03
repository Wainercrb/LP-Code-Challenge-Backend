import bcrypt from 'bcryptjs';

export class BcryptService {
  constructor() {}

  async comparePasswords(passwordA: string, passwordB: string): Promise<boolean> {
    return bcrypt.compare(passwordA, passwordB);
  }

  async generatePasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
