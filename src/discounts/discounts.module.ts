import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { DiscountsService } from './discounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  exports: [DiscountsService],
  providers: [DiscountsService],
})
export class DiscountsModule {}
