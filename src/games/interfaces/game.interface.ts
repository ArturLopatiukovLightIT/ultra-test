import { Discount } from '../../discounts/entities/discount.entity';

export interface IGame {
  id: string;
  title: string;
  price: number;
  publisherId: string;
  tags: string[];
  discount?: Discount;
  salePrice?: number;
  releaseDate: Date;
}
