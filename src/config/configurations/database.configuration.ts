import { registerAs } from '@nestjs/config';

export interface DatabaseConfiguration {
  host: string;
  name: string;
  user: string;
  pwd: string;
}

export default registerAs<DatabaseConfiguration>(
  'database',
  (): DatabaseConfiguration => ({
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pwd: process.env.DB_PWD,
  }),
);
