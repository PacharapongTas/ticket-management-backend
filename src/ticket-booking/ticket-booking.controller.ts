import { Controller, Get, Param, Query } from '@nestjs/common';
import { query } from 'express';
import { TicketBooking } from './entites/ticket-booking.entity';
import { TicketBookingService } from './ticket-booking.service';

@Controller('ticket-booking')
export class TicketBookingController {
  constructor(private readonly ticketBookingService: TicketBookingService) {}

  // Get All TicketBooking
  // Route /ticket-booking
  @Get()
  findAll(@Query() query): Promise<TicketBooking[]> {
    return this.ticketBookingService.findAll();
  }

  // Get Only one TicketBooking
  // Route /ticket-booking/1
  @Get(':id')
  find(@Param('id') id: string): Promise<TicketBooking[]> {
    return this.ticketBookingService.findById(id);
  }
}
