import { Sequelize } from 'sequelize';
import { development } from '@/shared/infra/database/config';

export const sequelize = new Sequelize(development);
