import { sequelize } from '../../../src/shared/infra/database/sequelize';
import { SequelizeOperation } from '../../../src/shared/infra/database/models/Operation';
import { SequelizeUser } from '../../../src/shared/infra/database/models/User';
import { SequelizeRecord } from '../../../src/shared/infra/database/models/Record';
import { operationData, userData, recordData } from '../../../src/shared/infra/database/seed-data/data.json';

const setupDatabase = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  await SequelizeOperation.bulkCreate(operationData);
  await SequelizeUser.bulkCreate(userData);
  await SequelizeRecord.bulkCreate(recordData.map((item) => ({ ...item, date: new Date(item.date) })));
};

const teardownDatabase = async () => {
  await sequelize.drop();
  await sequelize.close();
};

beforeAll(async () => {
  return await setupDatabase();
});

afterAll(async () => {
  return await teardownDatabase();
});
