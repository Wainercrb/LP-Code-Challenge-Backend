import { SequelizeCreateRecordRepository } from '@domain/repositories/record/SequelizeCreateRecordRepository';
import { SequelizeFindUserRepository } from '@domain/repositories/user/SequelizeFindUserRepository';
import { SequelizeUpdateUserRepository } from '@domain/repositories/user/SequelizeUpdateUserRepository';
import { SequelizeFindOperationRepository } from '@domain/repositories/operation/SequelizeFindOperationRepository';
import { CreateRecordService } from '@domain/services/record/CreateRecordService';
import { FindOperationService } from '@domain/services/operation/FindOperationService';
import { FindUserService } from '@domain/services/user/FindUserService';
import { UpdateUserService } from '@domain/services/user/UpdateUserService';
import { CreateRecordController } from '@infrastructure/controller/record/CreateRecordController';

export class CreateRecordControllerFactory {
  static make() {
    const createRecordRepository = new SequelizeCreateRecordRepository();
    const createRecordService = new CreateRecordService(createRecordRepository);

    const findUserRepository = new SequelizeFindUserRepository();
    const findUserService = new FindUserService(findUserRepository);

    const findOperationRepository = new SequelizeFindOperationRepository();
    const findOperationService = new FindOperationService(findOperationRepository);

    const updateUserRepository = new SequelizeUpdateUserRepository();
    const updateUserService = new UpdateUserService(updateUserRepository);

    const controller = new CreateRecordController(
      createRecordService,
      findUserService,
      findOperationService,
      updateUserService,
    );

    return controller;
  }
}
