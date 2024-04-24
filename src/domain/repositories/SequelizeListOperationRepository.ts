import sequelize from 'sequelize';
import { Op, Order, WhereOptions } from 'sequelize';
import { ListOperationRepository } from '@domain/services/ListOperationService';
import { OperationRow, SequelizeOperation } from '@infrastructure/database/models/Operation';
import {
  PaginationResult,
  buildPaginationRequest,
  buildPaginationResponse,
} from '@infrastructure/pagination/default.pagination';

export const RECORD_COLUMN_ORDER_MAPPING: Record<string, string> = {
  type: 'typ',
  cost: 'cost',
};

export class SequelizeListOperationRepository implements ListOperationRepository {
  async list(
    page: number,
    size: number,
    criteria?: string,
    orderColumn?: string,
    orderDirection?: string,
  ): Promise<PaginationResult<OperationRow[]>> {
    const { limit, offset } = buildPaginationRequest(page, size);

    let order: Order = [];
    let where: WhereOptions<OperationRow> = {};

    const selectedOrderColumn = RECORD_COLUMN_ORDER_MAPPING[orderColumn || ''];

    if (selectedOrderColumn && orderDirection) {
      order = [[sequelize.col(selectedOrderColumn), orderDirection]];
    }

    if (criteria && criteria.length) {
      where = {
        [Op.or]: [
          { type: { [Op.substring]: criteria } },
          !isNaN(Number(criteria)) ? { cost: { [Op.gte]: criteria } } : {},
        ],
      };
    }

    const { rows, count } = await SequelizeOperation.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order,
      where,
    });

    const flatRows: OperationRow[] = rows.map(({ id, type, cost }) => {
      return {
        id,
        type,
        cost,
      };
    });

    const { totalItems, totalPages } = buildPaginationResponse(size, count);

    return {
      totalPages,
      totalItems,
      rows: flatRows,
    };
  }
}
