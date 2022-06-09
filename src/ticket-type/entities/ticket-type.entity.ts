import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 36 })
  ticket_type: string;

  @Column('int')
  price: number;

  @Column('int')
  daily_quota: number;

  @Column('int')
  minimum: number;
}
