import { UserRow } from '@infrastructure/database/models/User';

export interface SignInUserRepository {
  findByUsername(email: string): Promise<UserRow | null>;
}

export class SignInUserService {
  constructor(private repository: SignInUserRepository) {}

  findByUsername(email: string) {
    return this.repository.findByUsername(email);
  }
}
