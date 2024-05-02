import { SequelizeRecordRepository } from '@/record/infra/repository/sequelize-record-repository';
import { SequelizeUserRepository } from '@/user/infra/repository/sequelize-user-repository';
import { SequelizeOperationRepository } from '@/operation/infra/repository/sequelize-user-repository';
import { List } from '@/record/application/list';
import { Create } from '@/record/application/create';
import { Delete } from '@/record/application/delete';
import { Controller } from '@/record/infra/res-api/controller';

const recordRepository = new SequelizeRecordRepository();
const userRepository = new SequelizeUserRepository();
const operationRepository = new SequelizeOperationRepository();

const listUseCase = new List(recordRepository);
const createUseCase = new Create(recordRepository, userRepository, operationRepository);
const deleteUseCase = new Delete(recordRepository);

export const controller = new Controller(listUseCase, createUseCase, deleteUseCase);
