import request from 'supertest';
import express from 'express';
import { controller } from '../../../../src/user/infra/dependencies';
import { AuthService } from '../../../../src/shared/infra/authentication/auth-service';
import { userRouter } from '../../../../src/user/infra/res-api/routes';

const app = express();
const authService = new AuthService();

app.use(express.json());
app.use('/users', userRouter);


console.log('node env', process.env.NODE_ENV)

describe('userRouter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle GET request to "/" route', async () => {
    const mockData = { id: 1, username: 'test_user' };
    const mockGetById = jest.spyOn(controller, 'getById').mockResolvedValue(Promise.resolve());

    const res = await request(app).get('/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(mockGetById).toHaveBeenCalled();

    mockGetById.mockRestore();
  });

//   it('should handle POST request to "/" route', async () => {
//     const mockData = { id: 1, username: 'test_user' };
//     const mockSignUp = jest.spyOn(controller, 'signUp').mockResolvedValue(Promise.resolve(mockData));

//     const res = await request(app)
//       .post('/users')
//       .send({ username: 'test_user', password: 'password123', role: 'admin', balance: 100 });

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(mockData);
//     expect(mockSignUp).toHaveBeenCalled();

//     mockSignUp.mockRestore();
//   });

//   it('should handle POST request to "/sign-in" route', async () => {
//     const mockData = { id: 1, username: 'test_user' };
//     const mockSignIn = jest.spyOn(controller, 'signIn').mockResolvedValue(Promise.resolve(mockData));

//     const res = await request(app)
//       .post('/users/sign-in')
//       .send({ username: 'test_user', password: 'password123' });

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(mockData);
//     expect(mockSignIn).toHaveBeenCalled();

//     mockSignIn.mockRestore();
//   });

//   it('should handle POST request to "/sign-out" route', async () => {
//     const mockData = { message: 'User signed out successfully' };
//     const mockSignOut = jest.spyOn(controller, 'signOut').mockResolvedValue(Promise.resolve(mockData));

//     const res = await request(app).post('/users/sign-out');

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(mockData);
//     expect(mockSignOut).toHaveBeenCalled();

//     mockSignOut.mockRestore();
//   });

//   it('should handle GET request to "/verify" route', async () => {
//     const mockData = { id: 1, username: 'test_user' };
//     const mockVerify = jest.spyOn(controller, 'verify').mockResolvedValue(Promise.resolve(mockData));

//     const res = await request(app).get('/users/verify');

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(mockData);
//     expect(mockVerify).toHaveBeenCalled();

//     mockVerify.mockRestore();
//   });
});
