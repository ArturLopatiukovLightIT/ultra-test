import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiscountsService } from '../discounts/discounts.service';
import { GamesService } from './games.service';
import { Between, LessThanOrEqual } from 'typeorm';
import { DateTime } from 'luxon';

@Injectable()
export class GamesTasks implements OnModuleInit {
  private readonly logger = new Logger(GamesTasks.name);
  constructor(
    private readonly _discountsService: DiscountsService,
    private readonly _gamesService: GamesService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async discountProcess() {
    const discount = await this._discountsService.findOne();
    if (!discount) {
      this.logger.warn('[discountProcess] Discount does not found');
      return;
    }
    const currenDate = new Date();
    const updateResult = await this._gamesService.updateMany(
      {
        releaseDate: Between(
          DateTime.fromJSDate(currenDate).minus({ months: 18 }).toJSDate(),
          DateTime.fromJSDate(currenDate).minus({ months: 12 }).toJSDate(),
        ),
      },
      {
        discount,
      },
    );
    this.logger.log(
      `[discountProcess] Discount applied for ${updateResult.affected} games`,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async deleteOldGames() {
    const deleteResult = await this._gamesService.deleteMany({
      releaseDate: LessThanOrEqual(
        DateTime.now().minus({ months: 18 }).toJSDate(),
      ),
    });
    this.logger.log(
      `[removeOldGames] Deleted ${deleteResult.affected} old games`,
    );
  }

  async onModuleInit() {
    await this.deleteOldGames();
    await this.discountProcess();
  }
}
