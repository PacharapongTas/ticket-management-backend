import { TicketBooking } from 'src/ticket-booking/entites/ticket-booking.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

const typeTicketBooking = /* istanbul ignore next */ () => TicketBooking;
const typeTicketBookingJoinTicketType =
  /* istanbul ignore next */
  (ticket_booking: TicketBooking) => ticket_booking.ticket_type;
@Entity()
@Unique(['ticket_type'])
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

  @OneToMany(typeTicketBooking, typeTicketBookingJoinTicketType)
  ticket_booking: TicketBooking[];
}
