import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGame } from './interfaces/game.interface';
import { Discount } from '../discounts/entities/discount.entity';

@Injectable()
export class GamesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IGame | IGame[]> {
    return next.handle().pipe(
      map((data) => {
        if (data.length > 0) {
          return data.map((d) => this.transformGame(d));
        } else if (Object.keys(data).length > 0) {
          return this.transformGame(data);
        } else {
          return data;
        }
      }),
    );
  }

  private transformGame(data: IGame): IGame {
    const game = { ...data };
    game.price = parseFloat(data.price as any);
    game.salePrice = null;
    if (!data.discount) {
      return game;
    }
    game.salePrice = this.getGameSalePrice(game.price, data.discount);
    return game;
  }

  private getGameSalePrice(price: number, discount: Discount): number {
    const discountPercent: number = discount.percent;
    const discountFactor: number = (100 - discountPercent) / 100;
    return parseFloat((price * discountFactor).toFixed(2));
  }
}
