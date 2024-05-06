import request from 'supertest';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ZodError } from 'zod';
import { User } from '../../../../src/user/domain/user'
import { Role } from '../../../../src/user/domain/user-role'
import { recordRouter } from '../../../../src/record/infra/res-api/routes';
import { userRouter } from '../../../../src/user/infra/res-api/routes';
import { Operation } from '../../../../src/operation/domain/operation';
import { SequelizeUser } from '../../../../src/shared/infra/database/models/User';
import { errorHandler } from '../../../../src/shared/infra/errors/handler';
import { operationData, recordData } from '../../../../src/shared/infra/database/seed-data/data.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/record', recordRouter);
app.use('/user', userRouter);
app.use(errorHandler);

describe('[operation-router]', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  let loggedUserHeader: string[] = [];
  let loggedUser: User;

  beforeAll(async () => {
    const [randomUser] = await SequelizeUser.findAll();
    const { header } = await request(app).post('/user/sign-in').send({
      username: randomUser.username,
      password: '1234567890',
    });
    loggedUserHeader = [...header['set-cookie']];
    loggedUser = {  
      id: randomUser.id,
      username: randomUser.username,
      balance: randomUser.balance,
      role: randomUser.role as Role,
      password: ''
    }
  });

  it('Should handle LIST the records', async () => {
    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: operationData.length,
    });

    const loggedUserRecordList = recordData.filter(item => item.user_id === loggedUser.id)

    expect(status).toBe(200);
    expect(body.rows.length).toStrictEqual(loggedUserRecordList.length);
  });

  it('Should handle LIST the record, using page:1 and size: 1', async () => {
    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: 1,
    });

    expect(status).toBe(200);
    expect(body.rows).toHaveLength(1);
  });

  // it('Should handle LIST the record, using "addition" as criteria', async () => {
  //   const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
  //     page: 1,
  //     size: operationData.length,
  //     criteria: 550,
  //   });

  //   expect(status).toBe(200);
  //   expect(body.rows).toHaveLength(1);
  // });

  // it('Should handle LIST the operations, shorting by "amount column" and "ASC direction"', async () => {
  //   const sortedRecordList = recordData.sort((a, b) => (a.amount - b.amount));

  //   const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
  //     page: 1,
  //     size: sortedRecordList.length,
  //     column: 'amount',
  //   });


  //   console.log(body)
  //   expect(body).toBe(1)

  //   expect(status).toBe(200);
  //   expect(
  //     body.rows.map((operation: Operation) => {
  //       return {
  //         type: operation.type,
  //         cost: operation.cost,
  //       };
  //     }),
  //   ).toStrictEqual(sortedRecordList);
  // });

  // it('Should handle LIST the operations, shorting by "type column" and "DESC direction"', async () => {
  //   const sortedOperationList = operationData.sort((a, b) => b.type.localeCompare(a.type));

  //   const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
  //     page: 1,
  //     size: sortedOperationList.length,
  //     column: 'type',
  //     direction: 'DESC',
  //   });

  //   expect(status).toBe(200);
  //   expect(
  //     body.rows.map((operation: Operation) => {
  //       return {
  //         type: operation.type,
  //         cost: operation.cost,
  //       };
  //     }),
  //   ).toStrictEqual(sortedOperationList);
  // });

  // it('Should throw an error since invalid LIST payload(page, size)', async () => {
  //   const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({});

  //   expect(status).toBe(400);
  //   expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
  //     'Pagination page required.',
  //     'Pagination size required.',
  //   ]);
  // });

  // it('Should throw an error since invalid LIST payload(column, direction)', async () => {
  //   const { status, body } = await request(app).get('/operation/all').set('Cookie', loggedUserHeader).query({
  //     page: 1,
  //     size: operationData.length,
  //     column: 'none',
  //     direction: 'none',
  //   });

  //   expect(status).toBe(400);
  //   expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
  //     "Invalid enum value. Expected 'cost' | 'type', received 'none'",
  //     "Invalid enum value. Expected 'ASC' | 'DESC', received 'none'",
  //   ]);
  // });
});
