import { Options } from 'sequelize';

export const config = {
  server: {
    port: process.env.PORT || 3000,
    isDevMode: process.env.NODE_ENV === 'development',
    randomOrgApiUrl: process.env.RANDOM_ORG_API_URL || '',
    randomOrgApiKey: process.env.RANDOM_ORG_API_KEY || '',
  },
  authentication: {
    secret: process.env.TOKEN_SECRET || 'secret',
    tokenExp: process.env.TOKEN_EXP || '1d',
  },
  sequelize: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    dialect: 'mysql',
  } as Options,
};
