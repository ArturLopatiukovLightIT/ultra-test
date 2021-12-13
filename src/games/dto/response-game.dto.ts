import { IGame } from '../interfaces/game.interface';
import { Discount } from '../../discounts/entities/discount.entity';

export class ResponseGameDto implements IGame {
  id: string;
  title: string;
  price: number;

  salePrice: number;
  tags: string[];
  publisherId: string;
  releaseDate: Date;
  discount: Discount;
}
