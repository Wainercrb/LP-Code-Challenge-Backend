import request from 'supertest';
import { User } from '../../../../src/user/domain/user';
import { Role } from '../../../../src/user/domain/user-role';
import { Record } from '../../../../src/record/domain/record';
import { SequelizeUser } from '../../../../src/shared/infra/database/models/User';
import { SequelizeOperation } from '../../../../src/shared/infra/database/models/Operation';
import { SequelizeRecord } from '../../../../src/shared/infra/database/models/Record';
import { operationData, recordData } from '../../../../src/shared/infra/database/seed-data/data.json';
import { bootstrap } from '../../../../src/index';
import { ZodError } from 'zod';

const app = bootstrap();

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
      password: '',
    };
  });

  it('Should handle LIST the records', async () => {
    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: operationData.length,
    });

    const loggedUserRecordList = recordData.filter((item) => item.user_id === loggedUser.id);

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

  it('Should handle LIST the record, using "addition" as criteria', async () => {
    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: operationData.length,
      criteria: 'addition',
    });

    expect(status).toBe(200);
    expect(body.rows).toHaveLength(2);
  });

  it('Should handle LIST the record, shorting by "amount column" and "ASC direction"', async () => {
    const sortedRecordList = recordData
      .filter(({ user_id }) => user_id === loggedUser.id)
      .sort((a, b) => a.amount - b.amount)
      .map(({ amount, user_id }) => ({ amount, user_id }));

    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: sortedRecordList.length,
      column: 'amount',
    });

    expect(status).toBe(200);
    expect(
      body.rows.map(({ amount, user }: Record) => {
        return {
          amount,
          user_id: user?.id ?? 0,
        };
      }),
    ).toStrictEqual(sortedRecordList);
  });

  it('Should handle LIST the record, shorting by "type column" and "DESC direction"', async () => {
    const sortedRecordList = recordData
      .filter(({ user_id }) => user_id === loggedUser.id)
      .sort((a, b) => b.amount - a.amount)
      .map(({ amount, user_id }) => ({ amount, user_id }));

    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: sortedRecordList.length,
      column: 'amount',
      direction: 'DESC',
    });

    expect(status).toBe(200);
    expect(
      body.rows.map(({ amount, user }: Record) => {
        return {
          amount,
          user_id: user?.id ?? 0,
        };
      }),
    ).toStrictEqual(sortedRecordList);
  });

  it('Should throw an error since invalid LIST payload(page, size)', async () => {
    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({});

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
      'Pagination page required.',
      'Pagination size required.',
    ]);
  });

  it('Should throw an error since invalid LIST payload(column, direction)', async () => {
    const { status, body } = await request(app).get('/record/all').set('Cookie', loggedUserHeader).query({
      page: 1,
      size: operationData.length,
      column: 'none',
      direction: 'none',
    });

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
      "Invalid enum value. Expected 'ASC' | 'DESC', received 'none'",
      "Invalid enum value. Expected 'amount', received 'none'",
    ]);
  });

  it('Should create a record successfully', async () => {
    const operationList = await SequelizeOperation.findAll({});

    const payload = {
      operation_id: operationList[0].id,
      valueA: 10,
      valueB: 10,
    };
    const { status, body } = await request(app).post('/record').set('Cookie', loggedUserHeader).send(payload);

    expect(status).toBe(201);
    expect(body.id).toBeDefined();
  });

  it('Should throw a payload error for record creation', async () => {
    const payload = {};
    const { status, body } = await request(app).post('/record').set('Cookie', loggedUserHeader).send(payload);

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual([
      'Operation ID is required.',
      'Value A is required.',
      'Value B is required.',
    ]);
  });

  it('Should throw a payload error since the operation ID is not valid', async () => {
    const payload = {
      operation_id: 999,
      valueA: 10,
      valueB: 10,
    };
    const { status, body } = await request(app).post('/record').set('Cookie', loggedUserHeader).send(payload);

    expect(status).toBe(404);
    expect(body.error).toBe('We cannot find an operation for this new record.');
  });

  it('Should delete a record successfully', async () => {
    const [randomRecordList] = await SequelizeRecord.findAll({});
    const { status, body } = await request(app)
      .delete('/record')
      .set('Cookie', loggedUserHeader)
      .query({ id: randomRecordList.id });

    expect(status).toBe(200);
    expect(body[0]).toBe(1); // rows affected
  });

  it('Should throw and error for delete record process', async () => {
    const { status, body } = await request(app).delete('/record').set('Cookie', loggedUserHeader);

    expect(status).toBe(400);
    expect(JSON.parse(body.error).map((item: ZodError) => item.message)).toStrictEqual(['Record ID is required']);
  });
});
