import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { CreateTicketBookingDto } from './dto/ticket-booking.dto';
import { TicketBooking } from './entites/ticket-booking.entity';
import { TicketBookingService } from './ticket-booking.service';

@Controller('ticket-booking')
export class TicketBookingController {
  constructor(private readonly ticketBookingService: TicketBookingService) {}

  // Get All TicketBooking
  // Route GET => /ticket-booking
  @Get()
  findAll(@Query() query): Promise<TicketBooking[]> {
    return this.ticketBookingService.findAll();
  }

  // Get Only one TicketBooking
  // Route GET => /ticket-booking/1
  @Get(':id')
  find(@Param('id') id: string): Promise<TicketBooking> {
    return this.ticketBookingService.findById(+id);
  }

  // Create TicketBooking
  // Route POST => /ticket-booking
  @Post()
  create(@Body() newTicket: CreateTicketBookingDto) {
    return this.ticketBookingService.create(newTicket);
  }

  // Update TicketBooking
  // Route PUT => /ticket-booking/1
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() newTicketBooking: CreateTicketBookingDto,
  ) {
    return this.ticketBookingService.update(+id, newTicketBooking);
  }

  // Delete TicketBooking
  // Route DELETE => /ticket-booking/1
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketBookingService.delete(+id);
  }
}
