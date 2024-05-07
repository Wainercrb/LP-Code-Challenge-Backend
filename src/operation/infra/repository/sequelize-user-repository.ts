import sequelize, { Order, WhereOptions, Op } from 'sequelize';
import { OperationRepository } from '@/operation/domain/operation-repository';
import { Operation } from '@/operation/domain/operation';
import { SequelizeOperation } from '@/shared/infra/database/models/Operation';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination';
import { buildPaginationRequest, buildPaginationResponse } from '@/shared/infra/pagination/pagination';
import { toOperationList, toSingleOperation } from '@/operation/infra/repository/mapper';

export class SequelizeOperationRepository implements OperationRepository {
  async getAll({ page, size, column, direction, criteria }: PaginationProps): Promise<PaginationResult<Operation[]>> {
    const { limit, offset } = buildPaginationRequest(page, size);

    const order: Order = [[sequelize.col(column), direction]];

    let where: WhereOptions = {};

    if (criteria) {
      where = {
        [Op.or]: [
          { type: { [Op.substring]: criteria } },
          !isNaN(Number(criteria)) ? { cost: { [Op.gte]: criteria } } : {},
        ],
      };
    }

    const { rows, count } = await SequelizeOperation.findAndCountAll({
      distinct: true,
      limit,
      offset,
      order,
      where,
    });

    const { totalItems, totalPages } = buildPaginationResponse(size, count);

    return {
      totalPages,
      totalItems,
      rows: toOperationList(rows),
    };
  }

  async getOneById(id: number): Promise<Operation | null> {
    const foundOperation = await SequelizeOperation.findOne({
      where: { id },
    });

    return foundOperation ? toSingleOperation(foundOperation) : null;
  }
}
