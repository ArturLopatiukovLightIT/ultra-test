import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '../../publishers/entities/publisher.entity';
import { Discount } from '../../discounts/entities/discount.entity';
import { SeederService } from './seeder.service';
import { Game } from '../../games/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Publisher, Discount])],
  providers: [SeederService],
})
export class SeederModule implements OnModuleInit {
  constructor(private readonly _seeder: SeederService) {}

  async onModuleInit() {
    await this._seeder.seed();
  }
}
