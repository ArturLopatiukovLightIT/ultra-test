import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public alias: string;

  @Column('decimal')
  public percent: number;
}
