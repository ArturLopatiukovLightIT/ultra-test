import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  findOne(id?: string) {
    return this.discountRepository.findOne(id);
  }
}
