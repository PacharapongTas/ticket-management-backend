import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketBookingController } from './ticket-booking/ticket-booking.controller';
import { TicketBookingService } from './ticket-booking/ticket-booking.service';
import { TicketBookingModule } from './ticket-booking/ticket-booking.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TicketBookingModule],
  controllers: [AppController, TicketBookingController],
  providers: [AppService, TicketBookingService],
})
export class AppModule {}
