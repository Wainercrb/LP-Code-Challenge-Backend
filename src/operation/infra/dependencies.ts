import { SequelizeOperationRepository } from '@/operation/infra/repository/sequelize-user-repository';
import { List } from '@/operation/application/list';
import { Controller } from '@/operation/infra/res-api/controller';

const operationRepository = new SequelizeOperationRepository();

const listUseCase = new List(operationRepository);

export const controller = new Controller(listUseCase);
