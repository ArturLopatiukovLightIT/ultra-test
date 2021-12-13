import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Publisher } from '../../publishers/entities/publisher.entity';
import { getPublisherSeeds } from './data/publishers';
import { Discount } from '../../discounts/entities/discount.entity';
import { Game } from '../../games/entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { DiscountsConfiguration } from '../../config/configurations/discounts.configuration';
import { getDiscountSeeds } from './data/discounts';
import { isEmpty, map } from 'lodash';
import { getGameSeeds } from './data/games';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(Game)
    private readonly _gamesRepository: Repository<Game>,
    @InjectRepository(Discount)
    private readonly _discountsRepository: Repository<Discount>,
    @InjectRepository(Publisher)
    private readonly _publishersRepository: Repository<Publisher>,
  ) {}

  private async _seedPublishers(): Promise<number> {
    const publisherCount = await this._publishersRepository.count();
    if (publisherCount) {
      return;
    }
    const data = getPublisherSeeds();
    const createdPublishers = await this._publishersRepository.save(
      plainToInstance(Publisher, data),
    );
    this.logger.log(
      `[seedPublishers] Publishers created: ${createdPublishers.length}`,
    );
    return createdPublishers.length;
  }

  private async _seedDiscounts(): Promise<number> {
    const discountsConfig =
      this._configService.get<DiscountsConfiguration>('discounts');
    const defaultDiscountCount = await this._discountsRepository.count({
      alias: discountsConfig.defaultLabel,
    });
    if (defaultDiscountCount) {
      return;
    }
    const data = getDiscountSeeds(discountsConfig);
    const createdDiscount = await this._discountsRepository.save(
      plainToInstance(Discount, data),
    );
    this.logger.log(
      `[seedDiscounts] Discounts created with label: ${createdDiscount.alias}`,
    );
    return 1;
  }

  private async _seedGames(): Promise<number> {
    const gamesCount = await this._gamesRepository.count();
    if (gamesCount) {
      return;
    }

    const publishers = await this._publishersRepository.find({
      select: ['id'],
    });
    if (isEmpty(publishers)) {
      return;
    }

    const publisherIds = map(publishers, 'id');
    const data = getGameSeeds(publisherIds);
    const createdGames = await this._gamesRepository.save(
      plainToInstance(Game, data),
    );
    this.logger.log(`[seedGames] Games created: ${createdGames.length}`);
    return createdGames.length;
  }

  public async seed() {
    await this._seedPublishers();
    await this._seedDiscounts();
    await this._seedGames();
  }
}
