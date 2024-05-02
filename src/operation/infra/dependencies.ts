import { SequelizeOperationRepository } from '@/operation/infra/repository/sequelize-user-repository';
import { ListOperation } from '@/operation/application/list-operation';
import { Controller } from '@/operation/infra/res-api/controller';

// Services & Repositories
const operationRepository = new SequelizeOperationRepository();

// Use Cases
const listOperation = new ListOperation(operationRepository);

export const controller = new Controller(listOperation);
