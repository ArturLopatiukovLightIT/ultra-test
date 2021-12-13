import app from './configurations/app.configuration';
import database from './configurations/database.configuration';
import discounts from './configurations/discounts.configuration';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  load: [app, database, discounts],
};

export default configOptions;
