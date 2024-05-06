import request from 'supertest';
import { ZodError } from 'zod';
import { Role } from '../../../../src/user/domain/user-role';
import { SequelizeUser } from '../../../../src/shared/infra/database/models/User';
import { bootstrap } from '../../../../src/index'

const app = bootstrap()

describe('[user-router]', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should handle SIGN-IN with valid credentials', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const { status, body } = await request(app).post('/user/sign-in').send({
      username: randomUser.username,
      password: '1234567890',
    });

    expect(status).toBe(200);
    expect(body).toStrictEqual({
      id: randomUser.id,
      username: randomUser.username,
      role: randomUser.role,
      balance: randomUser.balance,
      password: '',
    });
  });

  it('Should handle SIGN-IN with invalid credentials', async () => {
    const { status, body } = await request(app).post('/user/sign-in').send({
      username: 'test',
      password: 'test',
    });

    expect(status).toBe(401);
    expect(body.error).toBe('Invalid credentials.');
  });

  it('Should handle SIGN-IN with missing payload', async () => {
    const { status, body } = await request(app).post('/user/sign-in').send({
      username: '',
      password: '',
    });

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
      'String must contain at least 3 character(s)',
      'String must contain at least 3 character(s)',
    ]);
  });

  it('Should handle GET user with valid credentials', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const { header } = await request(app).post('/user/sign-in').send({
      username: randomUser.username,
      password: '1234567890',
    });

    const { status, body } = await request(app)
      .get('/user')
      .set('Cookie', [...header['set-cookie']])
      .send({
        username: randomUser.username,
        password: '1234567890',
      });

    expect(status).toBe(200);
    expect(body).toStrictEqual({
      id: randomUser.id,
      username: randomUser.username,
      role: randomUser.role,
      balance: randomUser.balance,
      password: '',
    });
  });

  it('Should handle GET user with invalid credentials', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const { status, body } = await request(app).get('/user').set('Cookie', ['none']).send({
      username: randomUser.username,
      password: '1234567890',
    });

    expect(status).toBe(401);
    expect(body.message).toBe('No token, authorization denied');
  });

  it('Should handle SIGN-UP with valid credentials', async () => {
    const { status, body } = await request(app).post('/user').send({
      username: 'signup-testing',
      password: 'signup-testing',
      role: Role.admin,
    });

    expect(status).toBe(201);
    expect({
      username: body.username,
      role: body.role,
      balance: body.balance,
    }).toStrictEqual({
      username: 'signup-testing',
      role: Role.admin,
      balance: 10000,
    });
  });

  it('Should handle SIGN-UP with missing payload', async () => {
    const { status, body } = await request(app).post('/user').send({
      username: '',
      password: '',
      role: '',
    });

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
      'String must contain at least 3 character(s)',
      'String must contain at least 3 character(s)',
      "Invalid enum value. Expected 'admin' | 'guess', received ''",
    ]);
  });

  it('Should handle SIGN-OUT', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const { header } = await request(app).post('/user/sign-in').send({
      username: randomUser.username,
      password: '1234567890',
    });

    const { status } = await request(app)
      .post('/user/sign-out')
      .set('Cookie', [...header['set-cookie']])
      .send({
        username: 'signup-testing',
        password: 'signup-testing',
        role: Role.admin,
      });

    expect(status).toBe(200);
  });

  it('Should handle VERIFY user with valid credentials', async () => {
    const [randomUser] = await SequelizeUser.findAll();

    const { header } = await request(app).post('/user/sign-in').send({
      username: randomUser.username,
      password: '1234567890',
    });

    const { status, body } = await request(app)
      .get('/user/verify')
      .set('Cookie', [...header['set-cookie']]);

    expect(status).toBe(200);
    expect(body).toStrictEqual({
      id: randomUser.id,
      username: randomUser.username,
      role: randomUser.role,
      balance: randomUser.balance,
      password: '',
    });
  });

  it('Should handle VERIFY throw since invalid credentials', async () => {
    const { status, body } = await request(app).get('/user/verify');

    expect(status).toBe(401);
    expect(body.message).toBe('No token, authorization denied');
  });
});
