import { registerAs } from '@nestjs/config';

export interface DiscountsConfiguration {
  defaultLabel: string;
}

export default registerAs<DiscountsConfiguration>(
  'discounts',
  (): DiscountsConfiguration => ({
    defaultLabel: process.env.DEFAULT_DISCOUNT_LABEL || 'default',
  }),
);
