import jwt from 'jsonwebtoken';
import { SequelizeUser } from '../../../src/shared/infra/database/models/User';
import { SequelizeUserRepository } from '../../../src/user/infra/repository/sequelize-user-repository';
import { SignUpUser } from '../../../src/user/application/sign-up-user';
import { setupDatabase, teardownDatabase } from '../../../tests/shared/infra/setup-database';
import { Role } from '../../../src/user/domain/user-role';
import { Error500, Error400 } from '../../../src/shared/infra/errors/handler';
import { BcryptService } from '../../../src/shared/infra/authentication/bcrypt-service';
import { AuthService } from '../../../src/shared/infra/authentication/auth-service';

describe('[sign-up-user]', () => {
  beforeAll(async () => {
    await setupDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  it('Should sign-up with valid user', async () => {
    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const bcryptService = new BcryptService();

    const signUpUser = new SignUpUser(userRepository, authService, bcryptService);

    const createdUser = await signUpUser.execute('test', '1234567890', Role.admin);

    const foundUser = await SequelizeUser.findOne({ where: { username: 'test' } });

    expect(createdUser.user).toBeDefined();

    expect(createdUser.user).toStrictEqual({
      id: foundUser?.id,
      username: foundUser?.username,
      role: foundUser?.role,
      balance: foundUser?.balance,
      password: '',
    });

    expect(createdUser.token).toBeDefined();
  });

  it('Should throw an error, since user already exist', async () => {
    const [randomUser] = await SequelizeUser.findAll();
    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const bcryptService = new BcryptService();

    const signUpUser = new SignUpUser(userRepository, authService, bcryptService);

    expect(async () => {
      await signUpUser.execute(randomUser.username, '1234567890', Role.admin);
    }).rejects.toThrow(Error400);
  });

  it('Should throw an error creating the token', async () => {
    jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options, callback) => {
      callback(null, undefined);
    });

    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const bcryptService = new BcryptService();

    const signUpUser = new SignUpUser(userRepository, authService, bcryptService);

    expect(async () => {
      await signUpUser.execute('test1', '1234567890', Role.admin);
    }).rejects.toThrow(new Error500('Error creating your token.'));
  });
});
