import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as assert from 'assert';
import { DatabaseConfiguration } from './config/configurations/database.configuration';
import { DiscountsModule } from './discounts/discounts.module';
import { GamesModule } from './games/games.module';
import { PublishersModule } from './publishers/publishers.module';
import createDatabaseOptions from './config/database/database.options';
import configOptions from './config/config.options';
import { ScheduleModule } from '@nestjs/schedule';
import { SeederModule } from './database/seeder/seeder.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig =
          configService.get<DatabaseConfiguration>('database');
        assert(databaseConfig, '"databaseConfig" is required');
        return createDatabaseOptions(databaseConfig);
      },
      inject: [ConfigService],
    }),
    SeederModule,
    DiscountsModule,
    GamesModule,
    PublishersModule,
  ],
})
export class AppModule {}
