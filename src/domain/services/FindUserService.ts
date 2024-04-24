import { UserRow } from '@infrastructure/database/models/User';

export interface FindUserRepository {
  find(userId: number): Promise<UserRow | null>;
}

export class FindUserService {
  constructor(private repository: FindUserRepository) {}

  async find(userId: number) {
    return this.repository.find(userId);
  }
}
