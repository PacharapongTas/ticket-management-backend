import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketBooking } from './entites/ticket.entity';
import { TicketBookingController } from './ticket-booking.controller';
import { TicketBookingService } from './ticket-booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketBooking])],
  providers: [TicketBookingService],
  controllers: [TicketBookingController],
  exports: [TicketBookingService],
})
export class TicketBookingModule {}
