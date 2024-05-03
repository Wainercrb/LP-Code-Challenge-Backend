import jwt from 'jsonwebtoken';
import { SequelizeUser } from '../../../src/shared/infra/database/models/User';
import { SequelizeUserRepository } from '../../../src/user/infra/repository/sequelize-user-repository';
import { SignInUser } from '../../../src/user/application/sign-in-user';
import { setupDatabase, teardownDatabase } from '../../../tests/shared/infra/setup-database';
import { Error500, Error401 } from '../../../src/shared/infra/errors/handler';
import { BcryptService } from '../../../src/shared/infra/authentication/bcrypt-service';
import { AuthService } from '../../../src/shared/infra/authentication/auth-service';

describe('[sign-in-user]', () => {
  beforeAll(async () => {
    await setupDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  it('Should sign-in with valid user', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const bcryptService = new BcryptService();

    const signInUser = new SignInUser(userRepository, authService, bcryptService);

    const foundUser = await signInUser.execute(randomUser.username, '1234567890');

    expect(foundUser.user).toStrictEqual({
      id: randomUser.id,
      username: randomUser.username,
      role: randomUser.role,
      balance: randomUser.balance,
      password: '',
    });

    expect(foundUser.token).toBeDefined();
  });

  it('Should throw an error with invalid user', async () => {
    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const bcryptService = new BcryptService();

    const signInUser = new SignInUser(userRepository, authService, bcryptService);

    expect(async () => {
      await signInUser.execute('none', '');
    }).rejects.toThrow(Error401);
  });

  it('Should throw an error with valid username but invalid password', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const bcryptService = new BcryptService();

    const signInUser = new SignInUser(userRepository, authService, bcryptService);

    expect(async () => {
      await signInUser.execute(randomUser.username, 'none');
    }).rejects.toThrow(Error401);
  });

  it('Should throw an error creating the token', async () => {
    jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options, callback) => {
      callback(null, undefined);
    });

    const [randomUser] = await SequelizeUser.findAll();

    const userRepository = new SequelizeUserRepository();

    const authService = new AuthService();

    const bcryptService = new BcryptService();

    const signInUser = new SignInUser(userRepository, authService, bcryptService);

    expect(async () => {
      await signInUser.execute(randomUser.username, '1234567890');
    }).rejects.toThrow(new Error500('Error creating your token.'));
  });
});
