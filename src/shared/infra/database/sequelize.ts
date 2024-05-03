import { Sequelize } from 'sequelize';
import { config } from '@/shared/infra/config';

export const sequelize = new Sequelize(config.sequelize);
