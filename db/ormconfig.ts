import { DataSource } from 'typeorm';
import { Todo } from '../entities/todo.entity';

const typeOrmDatabaseSource = new DataSource({
  type: 'mysql',
  host: "localhost",
  port: 13316,
  username: "root",
  password: "password",
  database: "fatify",
  synchronize: true,
  logging: true,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
});

export default typeOrmDatabaseSource;