import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketBooking {
  @PrimaryGeneratedColumn() id: number;

  @Column() created_at: Date;

  @Column() updated_at: Date;

  @Column() deleted_at: Date;
}
