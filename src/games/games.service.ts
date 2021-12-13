import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Publisher } from '../publishers/entities/publisher.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly _gamesRepository: Repository<Game>,
  ) {}

  create(createGameDto: CreateGameDto): Promise<Game> {
    const game = plainToInstance(Game, createGameDto);
    return this._gamesRepository.save(game);
  }

  async findAll() {
    return this._gamesRepository.find({ relations: ['discount'] });
  }

  findOne(id: string): Promise<Game> {
    return this._gamesRepository.findOne({ id });
  }

  async findGamePublisher(gameId: string): Promise<Publisher> {
    const game = await this._gamesRepository.findOne(gameId, {
      relations: ['publisher'],
    });
    if (!game) {
      throw new NotFoundException(`${Game.name} not found`);
    }
    return game.publisher;
  }

  async update(id: string, update: QueryDeepPartialEntity<Game>) {
    const gameInstance = await this.findOne(id);
    if (!gameInstance) {
      throw new NotFoundException(`${Game.name} not found`);
    }
    return this._gamesRepository.save(
      plainToClass(Game, { ...gameInstance, ...update }),
    );
  }

  async updateMany(
    filter: FindConditions<Game>,
    update: QueryDeepPartialEntity<Game>,
  ) {
    return this._gamesRepository.update(filter, update);
  }

  async deleteMany(filter: FindConditions<Game>) {
    return this._gamesRepository.delete(filter);
  }

  remove(id: string) {
    return this._gamesRepository.delete(id);
  }
}
