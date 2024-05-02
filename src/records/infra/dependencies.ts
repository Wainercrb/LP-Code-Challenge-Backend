import { SequelizeRecordRepository } from '@/records/infra/repository/sequelize-record-repository';
import { SequelizeUserRepository } from '@/users/infra/repository/sequelize-user-repository';
import { SequelizeOperationRepository } from '@/operations/infra/repository/sequelize-user-repository';
import { List } from '@/records/application/list';
import { Create } from '@/records/application/create';
import { Delete } from '@/records/application/delete';
import { Controller } from '@/records/infra/res-api/controller';

const recordRepository = new SequelizeRecordRepository();
const userRepository = new SequelizeUserRepository();
const operationRepository = new SequelizeOperationRepository();

const listUseCase = new List(recordRepository);
const createUseCase = new Create(recordRepository, userRepository, operationRepository);
const deleteUseCase = new Delete(recordRepository);

export const controller = new Controller(listUseCase, createUseCase, deleteUseCase);
