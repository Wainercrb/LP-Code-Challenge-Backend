import { validateSignIn } from '../../../../src/user/infra/validations/sign-in';
import { Role } from '../../../../src/user/domain/user-role';

describe('validateSignIn', () => {
  it('should return a User object with valid input', () => {
    const validBody = {
      username: 'john_doe',
      password: 'password123',
    };

    const user = validateSignIn(validBody);

    expect(user).toEqual({
      id: 0,
      username: 'john_doe',
      password: 'password123',
      role: '' as Role,
      balance: 0,
    });
  });

  it('should throw an error with invalid input', () => {
    const invalidBody = {
      username: 'jd',
      password: 'pwd',
    };

    expect(() => validateSignIn(invalidBody)).toThrow();
  });
});
