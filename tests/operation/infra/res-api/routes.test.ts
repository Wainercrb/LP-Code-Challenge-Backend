import request from 'supertest';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ZodError } from 'zod';
import { operationRouter } from '../../../../src/operation/infra/res-api/routes';
import { userRouter } from '../../../../src/user/infra/res-api/routes';
import { Operation } from '../../../../src/operation/domain/operation';
import { SequelizeUser } from '../../../../src/shared/infra/database/models/User';
import { errorHandler } from '../../../../src/shared/infra/errors/handler';
import { operationData } from '../../../../src/shared/infra/database/seed-data/data.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/operation', operationRouter);
app.use('/user', userRouter);
app.use(errorHandler);

describe('[operation-router]', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let loggedUserHeader: string[] = [];

  beforeAll(async () => {
    const [randomUser] = await SequelizeUser.findAll();
    const { header } = await request(app).post('/user/sign-in').send({
      username: randomUser.username,
      password: '1234567890',
    });
    loggedUserHeader = [...header['set-cookie']];
  });

  it('Should handle LIST the operations', async () => {
    const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: operationData.length,
    });

    expect(status).toBe(200);
    expect(body.rows).toHaveLength(operationData.length);
  });

  it('Should handle LIST the operations, using page:1 and size: 1', async () => {
    const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: 1,
    });

    expect(status).toBe(200);
    expect(body.rows).toHaveLength(1);
  });

  it('Should handle LIST the operations, using "addition" as criteria', async () => {
    const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: operationData.length,
      criteria: operationData[0].type,
    });

    expect(status).toBe(200);
    expect(body.rows).toHaveLength(1);
  });

  it('Should handle LIST the operations, shorting by "type column" and "ASC direction"', async () => {
    const sortedOperationList = operationData.sort((a, b) => a.type.localeCompare(b.type));

    const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: sortedOperationList.length,
      column: 'type',
    });

    expect(status).toBe(200);
    expect(
      body.rows.map((operation: Operation) => {
        return {
          type: operation.type,
          cost: operation.cost,
        };
      }),
    ).toStrictEqual(sortedOperationList);
  });

  it('Should handle LIST the operations, shorting by "type column" and "DESC direction"', async () => {
    const sortedOperationList = operationData.sort((a, b) => b.type.localeCompare(a.type));

    const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: sortedOperationList.length,
      column: 'type',
      direction: 'DESC',
    });

    expect(status).toBe(200);
    expect(
      body.rows.map((operation: Operation) => {
        return {
          type: operation.type,
          cost: operation.cost,
        };
      }),
    ).toStrictEqual(sortedOperationList);
  });

  it('Should throw an error since invalid LIST payload(page, size)', async () => {
    const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({});

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
      'Pagination page required.',
      'Pagination size required.',
    ]);
  });

  it('Should throw an error since invalid LIST payload(column, direction)', async () => {
    const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: operationData.length,
      column: 'none',
      direction: 'none',
    });

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
      "Invalid enum value. Expected 'ASC' | 'DESC', received 'none'",
      "Invalid enum value. Expected 'cost' | 'type', received 'none'",
    ]);
  });
});
