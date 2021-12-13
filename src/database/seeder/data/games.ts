import { DeepPartial } from 'typeorm';
import * as Chance from 'chance';
import { isEmpty, map, random, times } from 'lodash';
import { Game } from '../../../games/entities/game.entity';
import { DateTime } from 'luxon';

export function getGameSeeds(publisherIds: string[]): DeepPartial<Game[]> {
  if (isEmpty(publisherIds)) {
    return [];
  }
  const chance = new Chance();
  return map(times(10), () => {
    return {
      title: chance.word(),
      price: chance.floating({ min: 0, max: 500, fixed: 2 }),
      releaseDate: chance.date({
        min: DateTime.now().minus({ years: 2 }).toJSDate(),
        max: new Date(),
      }),
      publisherId: chance.pickone(publisherIds),
      tags: chance.unique(chance.word, random(3, 10)),
    };
  });
}
