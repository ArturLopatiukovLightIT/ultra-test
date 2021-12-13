import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Publisher } from '../../publishers/entities/publisher.entity';
import { Discount } from '../../discounts/entities/discount.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column('decimal')
  public price: number;

  @Column({ nullable: false, select: true })
  public publisherId: string;

  @ManyToOne((belongsTo) => Publisher)
  @JoinColumn({
    name: 'publisherId',
  })
  public publisher: Publisher;

  @Column('varchar', {
    array: true,
    length: 20,
  })
  public tags: string[];

  @Column('date')
  public releaseDate: Date;

  @Column({
    nullable: true,
  })
  public discountId: string;

  @ManyToOne((hasOne) => Discount)
  @JoinColumn({
    name: 'discountId',
  })
  public discount: Discount;
}
