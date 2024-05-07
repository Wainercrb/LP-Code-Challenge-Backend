import { SequelizeOperationRepository } from '../../../src/operation/infra/repository/sequelize-user-repository';
import { ListOperation } from '../../../src/operation/application/list-operation';
import { PaginationProps } from '../../../src/shared/domain/pagination';
import { operationData } from '../../../src/shared/infra/database/seed-data/data.json';

describe('[list-operation]', () => {
  it('Should LIST the operation', async () => {
    const pagination: PaginationProps = {
      page: 1,
      size: operationData.length,
      column: 'type',
      direction: 'ASC',
    };

    const operationRepository = new SequelizeOperationRepository();

    const listOperation = new ListOperation(operationRepository);

    const { rows, totalItems, totalPages } = await listOperation.execute(pagination);

    expect(rows).toHaveLength(operationData.length);
    expect(totalItems).toBe(operationData.length);
    expect(totalPages).toBe(1);
  });
});
