import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { TicketBooking } from './entites/ticket.entity';
import { TicketBookingService } from './ticket-booking.service';

@Controller('ticket-booking')
export class TicketBookingController {
  constructor(private readonly ticketBookingService: TicketBookingService) {}

  @Get()
  findAll(@Query() query): Promise<TicketBooking[]> {
    return this.ticketBookingService.findAll();
  }
}
