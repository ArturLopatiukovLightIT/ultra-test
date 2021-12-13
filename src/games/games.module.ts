import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GamesTasks } from './games.tasks';
import { DiscountsModule } from '../discounts/discounts.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesTasks],
  imports: [TypeOrmModule.forFeature([Game]), DiscountsModule],
})
export class GamesModule {}
