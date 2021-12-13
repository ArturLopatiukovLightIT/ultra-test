import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @Length(2, 25)
  public title: string;

  @IsNotEmpty()
  @IsNumber()
  public price: number;

  @IsNotEmpty()
  @IsUUID()
  public publisherId: string;

  @Length(2, 20, {
    each: true,
  })
  public tags: string[];

  @IsNotEmpty()
  @IsDateString()
  public releaseDate: Date;
}
