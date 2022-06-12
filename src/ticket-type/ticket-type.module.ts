import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketBookingModule } from 'src/ticket-booking/ticket-booking.module';
import { TicketType } from './entities/ticket-type.entity';
import { TicketTypeController } from './ticket-type.controller';
import { TicketTypeService } from './ticket-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketType]),
    forwardRef(() => TicketBookingModule),
  ],
  providers: [TicketTypeService],
  controllers: [TicketTypeController],
  exports: [TicketTypeService],
})
export class TicketTypeModule {}
