import { Sequelize } from 'sequelize';

const {
  MYSQL_DATABASE, MYSQL_PORT, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER,
} = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
