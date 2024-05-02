import { SequelizeRecordRepository } from '@/record/infra/repository/sequelize-record-repository';
import { SequelizeUserRepository } from '@/user/infra/repository/sequelize-user-repository';
import { SequelizeOperationRepository } from '@/operation/infra/repository/sequelize-user-repository';
import { ListRecord } from '@/record/application/list-record';
import { CreateRecord } from '@/record/application/create-record';
import { DeleteRecord } from '@/record/application/delete-record';
import { Controller } from '@/record/infra/res-api/controller';

// Services & Repositories
const recordRepository = new SequelizeRecordRepository();
const userRepository = new SequelizeUserRepository();
const operationRepository = new SequelizeOperationRepository();

// Use Cases
const listRecord = new ListRecord(recordRepository);
const createRecord = new CreateRecord(recordRepository, userRepository, operationRepository);
const deleteRecord = new DeleteRecord(recordRepository);

export const controller = new Controller(listRecord, createRecord, deleteRecord);
