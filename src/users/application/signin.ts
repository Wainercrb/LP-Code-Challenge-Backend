import { AuthService } from '@/shared/infra/authentication/AuthService';
import { User } from '../domain/user';
import { Error401, Error500 } from '@/shared/infra/errors/handler';
import { UserRepository } from '../domain/user-repository';
import { logger } from '@/shared/infra/logger/logger';

export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(username: string, password: string): Promise<{ user: User; token: string }> {
    logger.info(`[SignInUseCase] - Sign-in start username: ${username}`);

    const foundUser = await this.userRepository.getOneByUsername(username);

    if (!foundUser) {
      throw new Error401();
    }

    const passwordMatch = await this.authService.comparePasswords(password, foundUser.password);

    if (!passwordMatch) {
      throw new Error401();
    }

    const tokenPayload = {
      id: foundUser.id,
      role: foundUser.role,
      username: foundUser.username,
    };

    const token = await this.authService.createJWT(tokenPayload);

    if (!token) {
      throw new Error500();
    }

    logger.info(`[SignInUseCase] - Sign-in end username:${username}, id:${foundUser.id}`);

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
