import { DeepPartial } from 'typeorm';
import { Publisher } from '../../../publishers/entities/publisher.entity';
import * as Chance from 'chance';
import { map, times } from 'lodash';

export function getPublisherSeeds(): DeepPartial<Publisher[]> {
  const chance = new Chance();
  return map(times(5), () => {
    return {
      name: chance.name(),
      siret: chance.integer({ min: 0, max: 500 }),
      phone: chance.phone(),
    };
  });
}
