import sequelize from 'sequelize';
import { Op, Order, WhereOptions } from 'sequelize';
import { ListRecordRepository } from '@domain/services/ListRecordService';
import { SequelizeOperation } from '@infrastructure/database/models/Operation';
import { RecordRow, SequelizeRecord } from '@infrastructure/database/models/Record';
import { SequelizeUser } from '@infrastructure/database/models/User';
import {
  PaginationResult,
  buildPaginationRequest,
  buildPaginationResponse,
} from '@infrastructure/pagination/default.pagination';

export const RECORD_COLUMN_ORDER_MAPPING: Record<string, string> = {
  userUsername: 'user.username',
  userRole: 'user.role',
  operationType: 'operation.type',
  operationCost: 'operation.cost',
  recordDate: 'date',
  recordAmount: 'amount',
  recordOperationResponse: 'operation_response',
};

export class SequelizeListRecordRepository implements ListRecordRepository {
  async list(
    userId: number,
    page: number,
    size: number,
    criteria?: string,
    orderColumn?: string,
    orderDirection?: string,
  ): Promise<PaginationResult<RecordRow[]>> {
    const { limit, offset } = buildPaginationRequest(page, size);

    let order: Order = [];
    let where: WhereOptions<RecordRow> = {
      user_id: userId,
      isDeleted: false,
    };

    const selectedOrderColumn = RECORD_COLUMN_ORDER_MAPPING[orderColumn || ''];
    console.log(selectedOrderColumn, orderDirection, orderColumn)
    if (selectedOrderColumn && orderDirection) {
      console.log('ordeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      order = [[sequelize.col(selectedOrderColumn), orderDirection]];
    }

    if (criteria && criteria.length) {
      where = {
        user_id: userId,
        isDeleted: false,
        [Op.or]: [
          { '$user.username$': { [Op.substring]: criteria } },
          { '$user.role$': { [Op.substring]: criteria } },
          { '$operation.type$': { [Op.substring]: criteria } },
          !isNaN(Number(criteria)) ? { '$operation.cost$': { [Op.gte]: criteria } } : {},
          { '$SequelizeRecord`.date$': { [Op.substring]: criteria } },
          !isNaN(Number(criteria)) ? { '$SequelizeRecord.amount$': { [Op.gte]: criteria } } : {},
          { '$SequelizeRecord`.operation_response$': { [Op.substring]: criteria } },
        ],
      };
    }

    const { rows, count } = await SequelizeRecord.findAndCountAll({
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: SequelizeUser,
          attributes: ['username', 'role', 'id'],
          as: 'user',
        },
        {
          model: SequelizeOperation,
          attributes: ['type', 'cost', 'id'],
          as: 'operation',
        },
      ],
      order,
      where,
    });

    const flatRows: RecordRow[] = rows.map(
      ({ id, amount, operation_response, date, operation_id, user_id, user, operation }) => {
        return {
          id,
          user_id,
          operation_id,
          user,
          operation,
          amount,
          operation_response,
          date,
          isDeleted: false,
        };
      },
    );

    const { totalItems, totalPages } = buildPaginationResponse(size, count);

    return {
      totalPages,
      totalItems,
      rows: flatRows,
    };
  }
}
