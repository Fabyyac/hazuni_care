import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dialect = (process.env.DB_DIALECT || 'postgres') as any;
const databaseUrl = process.env.DATABASE_URL;

const sequelizeOptions: any = {
  dialect,
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
};

const useSsl = dialect === 'postgres' && process.env.DB_SSL === 'true';

if (useSsl) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, sequelizeOptions)
  : new Sequelize(
      process.env.DB_NAME || 'hazuni_care',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || (dialect === 'postgres' ? 5432 : 3306)),
        ...sequelizeOptions
      }
    );

export default sequelize;