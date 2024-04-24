import { SequelizeSignInUserRepository } from '../../../../src/domain/repositories/user/SequelizeSignInUserRepository';
import { SignInUserRepository } from '../../../../src/domain/services/user/SignInUserService';
import { SequelizeUser } from '../../../../src/infrastructure/database/models/User';

jest.mock('@infrastructure/database/models/User');

describe('SequelizeSignInUserRepository', () => {
  let repository: SignInUserRepository;

  beforeEach(() => {
    repository = new SequelizeSignInUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find user by username', async () => {
    const username = 'testuser';
    const userRow = { id: 1, username, role: 'user', balance: 100 };

    (SequelizeUser.findOne as jest.Mock).mockResolvedValueOnce(userRow);

    const result = await repository.findByUsername(username);

    expect(result).toEqual(userRow);
    expect(SequelizeUser.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { username },
        raw: true,
      }),
    );
  });

  it('should return null if user is not found', async () => {
    const username = 'nonexistentuser';

    (SequelizeUser.findOne as jest.Mock).mockResolvedValueOnce(null);

    const result = await repository.findByUsername(username);

    expect(result).toBeNull();
    expect(SequelizeUser.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { username },
        raw: true,
      }),
    );
  });
});
