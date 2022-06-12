import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketTypeModule } from 'src/ticket-type/ticket-type.module';
import { TicketBooking } from './entites/ticket-booking.entity';
import { TicketBookingController } from './ticket-booking.controller';
import { TicketBookingService } from './ticket-booking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketBooking]),
    forwardRef(() => TicketTypeModule),
  ],
  providers: [TicketBookingService],
  controllers: [TicketBookingController],
  exports: [TicketBookingService],
})
export class TicketBookingModule {}
