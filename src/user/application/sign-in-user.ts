import { User } from '@/user/domain/user';

// Repositories
import { UserRepository } from '@/user/domain/user-repository';

// Shared
import { Error401, Error500 } from '@/shared/infra/errors/handler';
import { AuthService } from '@/shared/infra/authentication/AuthService';
import { BcryptService } from '@/shared/infra/authentication/BcryptService';
import { logger } from '@/shared/infra/logger/logger';

export class SignInUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(username: string, password: string): Promise<{ user: User; token: string }> {
    logger.info(`[SignInUser] - Sign-in start. Username: ${username}`);

    const foundUser = await this.userRepository.getOneByUsername(username);

    if (!foundUser) throw new Error401();

    const passwordMatch = await this.bcryptService.comparePasswords(password, foundUser.password);

    if (!passwordMatch) throw new Error401();

    const tokenPayload = {
      userID: foundUser.id,
      role: foundUser.role,
      username: foundUser.username,
    };

    const token = await this.authService.createJWT(tokenPayload);

    if (!token) throw new Error500('Error creating your token.');

    logger.info(`[SignInUser] - Sign-in successful. Username: ${username}, UserID: ${foundUser.id}`);

    return {
      token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        password: '',
        balance: foundUser.balance,
        role: foundUser.role,
      },
    };
  }
}
