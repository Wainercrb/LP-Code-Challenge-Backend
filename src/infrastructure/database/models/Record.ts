import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@infrastructure/database/sequelize';
import { SequelizeUser } from './User';
import { SequelizeOperation } from './Operation';

export interface RecordRow {
  id: number;
  user_id: number;
  operation_id: number;
  amount: number;
  operation_response: string;
  isDeleted: boolean;
  date: Date;
}

class SequelizeRecord extends Model<RecordRow, Omit<RecordRow, 'id'>> {
  declare id: number;
  declare amount: number;
  declare operation_response: string;
  declare date: Date;
  declare user_id: number;
  declare operation_id: number;
  declare user: SequelizeUser;
  declare isDeleted: boolean;
  declare operation: SequelizeOperation;
}

SequelizeRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    operation_response: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'operations',
        key: 'id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'records',
  },
);

SequelizeRecord.belongsTo(SequelizeUser, { foreignKey: "user_id", as: 'user' })
SequelizeRecord.belongsTo(SequelizeOperation, { foreignKey: "operation_id", as: 'operation' })

export { SequelizeRecord };
