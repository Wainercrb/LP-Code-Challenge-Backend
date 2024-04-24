import { PaginationResult } from '../../../../src/infrastructure/pagination/default.pagination';
import { RecordRow, SequelizeRecord } from '../../../../src/infrastructure/database/models/Record';
import { SequelizeUser } from '../../../../src/infrastructure/database/models/User';
import { SequelizeOperation } from '../../../../src/infrastructure/database/models/Operation';
import { SequelizeListRecordRepository } from '../../../../src/domain/repositories/record/SequelizeListRecordRepository';

jest.mock('@infrastructure/database/models/Record');
jest.mock('@infrastructure/database/models/User');
jest.mock('@infrastructure/database/models/Operation');
jest.mock('sequelize');

describe('SequelizeListRecordRepository', () => {
  let repository: SequelizeListRecordRepository;

  beforeEach(() => {
    repository = new SequelizeListRecordRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list records with default parameters', async () => {
    const userId = 123;
    const page = 1;
    const size = 10;
    const expectedPaginationResult: PaginationResult<RecordRow[]> = {
      totalPages: 2,
      totalItems: 20,
      rows: [
        {
          id: 1,
          amount: 10,
          operation_response: 'Success',
          date: new Date(),
          isDeleted: false,
          operation_id: 1,
          user_id: 1,
        },
      ],
    };

    (SequelizeRecord.findAndCountAll as jest.Mock).mockResolvedValueOnce({
      rows: expectedPaginationResult.rows,
      count: expectedPaginationResult.totalItems,
    });

    const result = await repository.list(userId, page, size);

    expect(result).toEqual(expectedPaginationResult);
    expect(SequelizeRecord.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: size,
        offset: 0,
        where: expect.objectContaining({ user_id: userId, isDeleted: false }),
        include: expect.arrayContaining([
          expect.objectContaining({ model: SequelizeUser, as: 'user', attributes: ['username', 'role', 'id'] }),
          expect.objectContaining({ model: SequelizeOperation, as: 'operation', attributes: ['type', 'cost', 'id'] }),
        ]),
      }),
    );
  });
});
