import { SequelizeOperationRepository } from '@/operations/infra/repository/sequelize-user-repository';
import { List } from '@/operations/application/list';
import { Controller } from '@/operations/infra/res-api/controller';

const operationRepository = new SequelizeOperationRepository();

const listUseCase = new List(operationRepository);

export const controller = new Controller(listUseCase);
