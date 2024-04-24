import { SequelizeUser, UserRow } from '../../../../src/infrastructure/database/models/User';
import { SequelizeCreateUserRepository } from '../../../../src/domain/repositories/user/SequelizeCreateUserRepository';
import { AdminUser } from '../../../../src/domain/entities/User/AdminUser';
import { Role } from '../../../../src/domain/entities/User/User';

// Mock the SequelizeUser model
jest.mock('@infrastructure/database/models/User', () => ({
  SequelizeUser: {
    create: jest.fn(),
  },
}));

describe('SequelizeCreateUserRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user in the database', async () => {
    const repository = new SequelizeCreateUserRepository();

    const userSaved: UserRow = {
      id: 1,
      username: 'testUser',
      balance: 0,
      role: 'user',
      password: '',
    };

    (SequelizeUser.create as jest.Mock).mockResolvedValue(userSaved);

    const newUser: AdminUser = new AdminUser(userSaved.username, userSaved.password, userSaved.balance);
    const result = await repository.create(newUser);

    expect(SequelizeUser.create).toHaveBeenCalledWith({
      username: userSaved.username,
      balance: userSaved.balance,
      password: userSaved.password,
      role: Role.admin,
    });
    expect(result).toEqual(userSaved);
  });
});
