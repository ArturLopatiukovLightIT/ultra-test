import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GamesInterceptor } from './games.interceptor';
import { plainToInstance } from 'class-transformer';
import { ResponsePublisherDto } from './dto/response-publisher.dto';
import { ResponseGameDto } from './dto/response-game.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiResponse({ type: ResponseGameDto })
  @UseInterceptors(GamesInterceptor)
  @Post()
  create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto);
  }

  @ApiResponse({ type: ResponseGameDto })
  @UseInterceptors(GamesInterceptor)
  @Get()
  async findAll(): Promise<ResponseGameDto[]> {
    return plainToInstance(ResponseGameDto, await this.gamesService.findAll());
  }

  @ApiResponse({ type: ResponseGameDto })
  @UseInterceptors(GamesInterceptor)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseGameDto> {
    return plainToInstance(
      ResponseGameDto,
      await this.gamesService.findOne(id),
    );
  }

  @Get(':id/publisher')
  async findGamePublisher(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponsePublisherDto> {
    return plainToInstance(
      ResponsePublisherDto,
      await this.gamesService.findGamePublisher(id),
    );
  }

  @ApiResponse({ type: ResponseGameDto })
  @UseInterceptors(GamesInterceptor)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.update(id, updateGameDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
