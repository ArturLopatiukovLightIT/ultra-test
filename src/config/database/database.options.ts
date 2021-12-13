import { DatabaseConfiguration } from '../configurations/database.configuration';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default function createDatabaseOptions(
  config: DatabaseConfiguration,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: config.host,
    port: 5432,
    username: config.user,
    password: config.pwd,
    database: config.name,
    entities: [join(__dirname, '../../**', '*.entity.{ts,js}')],
    synchronize: true,
    logging: false,
  };
}
