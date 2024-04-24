import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@infrastructure/database/sequelize';

export interface UserRow {
  id: number;
  username: string;
  password: string;
  role: string;
  balance: number;
}

class SequelizeUser extends Model<UserRow, Omit<UserRow, 'id'>> {
  declare id: number;
  declare username: string;
  declare password: string;
  declare role: string;
  declare balance: number;
}

SequelizeUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'users',
  },
);


export { SequelizeUser };
