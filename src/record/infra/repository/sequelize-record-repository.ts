import { Order, WhereOptions, Op, Transaction } from 'sequelize';
import { sequelize } from '@/shared/infra/database/sequelize';
import { SequelizeOperation } from '@/shared/infra/database/models/Operation';
import { PaginationProps, PaginationResult } from '@/shared/domain/pagination';
import { buildPaginationRequest, buildPaginationResponse } from '@/shared/infra/pagination/default.pagination';
import { RecordRepository } from '@/record/domain/record-repository';
import { Record } from '@/record/domain/record';
import { SequelizeRecord } from '@/shared/infra/database/models/Record';
import { toSingleRecord, toRecordList, filterRecordColumn } from '@/record/infra/repository/mapper';
import { SequelizeUser } from '@/shared/infra/database/models/User';

export class SequelizeRecordRepository implements RecordRepository {
  async listRecord(userID: number, pagination: PaginationProps, t?: Transaction): Promise<PaginationResult<Record[]>> {
    const { page, size, column, direction, criteria } = pagination;
    const { limit, offset } = buildPaginationRequest(page, size);

    let order: Order = [];
    let where: WhereOptions = {
      user_id: userID,
      isDeleted: false,
    };

    const selectedOrderColumn = filterRecordColumn[column || ''];
    if (selectedOrderColumn) {
      order = [[sequelize.col(selectedOrderColumn), direction]];
    }

    if (criteria) {
      where = {
        user_id: userID,
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
      transaction: t,
    });

    const { totalItems, totalPages } = buildPaginationResponse(size, count);

    return {
      totalPages,
      totalItems,
      rows: toRecordList(rows),
    };
  }

  async getOneById(id: number, t?: Transaction): Promise<Record | null> {
    const foundRecord = await SequelizeRecord.findOne({
      where: { id },
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
      transaction: t,
    });

    return foundRecord && toSingleRecord(foundRecord);
  }

  async deleteById(id: number, t?: Transaction): Promise<[affectedCount: number]> {
    const body = {
      isDeleted: true,
    };

    return SequelizeRecord.update(body, { where: { id }, transaction: t });
  }

  async createRecord(
    userID: number,
    operationID: number,
    amount: number,
    operationResponse: string,
    isDeleted: boolean,
    date: Date,
    t?: Transaction,
  ): Promise<Record | null> {
    const createdRecord = await SequelizeRecord.create(
      {
        operation_id: operationID,
        user_id: userID,
        amount: amount,
        operation_response: operationResponse,
        date,
        isDeleted,
      },
      { transaction: t },
    );

    return toSingleRecord(createdRecord)
  }
}
