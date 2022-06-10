import { TicketType } from 'src/ticket-type/entities/ticket-type.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

const typeTicketType = /* istanbul ignore next */ () => TicketType;
const typeTicketTypeJoinTicketBooking = /* istanbul ignore next */ (
  ticket_type: TicketType,
) => ticket_type.ticket_booking;

@Entity()
export class TicketBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(typeTicketType, typeTicketTypeJoinTicketBooking, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ticket_type_id' })
  ticket_type: TicketType;

  @Column()
  ticket_type_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  deleted_at?: Date;
}
