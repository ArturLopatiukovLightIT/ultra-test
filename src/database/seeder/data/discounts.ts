import { Discount } from '../../../discounts/entities/discount.entity';
import { DiscountsConfiguration } from '../../../config/configurations/discounts.configuration';
import { DeepPartial } from 'typeorm';

export function getDiscountSeeds(
  discountsConfig: DiscountsConfiguration,
): DeepPartial<Discount> {
  return {
    alias: discountsConfig.defaultLabel,
    percent: 20,
  };
}
