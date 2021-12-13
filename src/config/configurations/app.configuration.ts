import { registerAs } from '@nestjs/config';

export interface AppConfiguration {
  port: number;
}

export default registerAs<AppConfiguration>(
  'app',
  (): AppConfiguration => ({
    port: +(process.env.API_PORT as string),
  }),
);
