import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@infrastructure/database/sequelize';

export interface OperationRow {
  id: number;
  type: string;
  cost: number;
}

class SequelizeOperation extends Model<OperationRow, Omit<OperationRow, 'id'>> {
  declare id: number;
  declare type: string;
  declare cost: number;
}

SequelizeOperation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'operations',
  },
);

export { SequelizeOperation };
