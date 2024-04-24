import jwt from 'jsonwebtoken';
import { jwtVerify } from '../../../../src/infrastructure/middleware/jwt/VerifyToken';

jest.mock('jsonwebtoken');

describe('JWT Verify Utility', () => {
  it('should verify a JWT token', async () => {
    const token = 'valid_token';
    const secret = 'test_secret';
    const decodedPayload = { username: 'testuser', role: 'admin', id: 123 };

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, decodedPayload);
    });

    const decoded = await jwtVerify(token, secret);

    expect(decoded).toEqual(decodedPayload);
    expect(jwt.verify).toHaveBeenCalledWith(token, secret, expect.any(Function));
  });

  it('should reject with error when jwt.verify fails', async () => {
    const token = 'invalid_token';
    const secret = 'test_secret';
    const errorMessage = 'Verification failed';

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error(errorMessage), null);
    });

    await expect(jwtVerify(token, secret)).rejects.toThrow(errorMessage);
  });
});
