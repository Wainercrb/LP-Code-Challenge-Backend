import jwt from 'jsonwebtoken';
import { createAccessToken } from '../../../../src/infrastructure/middleware/jwt/AccessToken';
import { SECRET } from '../../../../src/infrastructure/middleware/config';

jest.mock('jsonwebtoken');

describe('Access Token Utility', () => {
  it('should create an access token', async () => {
    const payload = { userId: 123 };

    const expectedToken = 'mocked_token';

    (jwt.sign as jest.Mock).mockImplementation((payload, secret, options, callback) => {
      callback(null, expectedToken);
    });

    const token = await createAccessToken(payload);

    expect(token).toBe(expectedToken);
    expect(jwt.sign).toHaveBeenCalledWith(payload, SECRET, { expiresIn: '1d' }, expect.any(Function));
  });

  it('should reject with error when jwt.sign fails', async () => {
    const payload = { userId: 123 };
    const errorMessage = 'Signing failed';

    (jwt.sign as jest.Mock).mockImplementation((payload, secret, options, callback) => {
      callback(new Error(errorMessage), null);
    });

    await expect(createAccessToken(payload)).rejects.toThrow(errorMessage);
  });
});
