import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from 'utils/constants';
import { CreateTicketBookingDto } from './dto/create-ticket-booking.dto';
import { TicketBooking } from './entites/ticket-booking.entity';
import { TicketBookingService } from './ticket-booking.service';

@Controller('ticket-booking')
export class TicketBookingController {
  constructor(private readonly ticketBookingService: TicketBookingService) {}

  // Get All TicketBooking
  // Route GET => /ticket-booking
  @Get()
  findAll(
    // For initial default page and limit page
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = DEFAULT_PAGE,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = DEFAULT_PAGE_LIMIT,
    @Query('ticket_type_id') ticket_type_id,
    @Query('created_at') created_at,
  ): Promise<Pagination<TicketBooking>> {
    return this.ticketBookingService.findAll({
      page,
      limit,
      ticket_type_id,
      created_at,
    });
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
