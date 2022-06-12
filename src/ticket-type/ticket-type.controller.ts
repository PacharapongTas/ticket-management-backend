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
import { CreateTicketTypeDto } from './dto/ticket-type.dto';
import { TicketType } from './entities/ticket-type.entity';
import { TicketTypeService } from './ticket-type.service';

@Controller('ticket-type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  // Get All TicketType
  // Route GET => /ticket-type
  @Get()
  findAll(): Promise<TicketType[]> {
    return this.ticketTypeService.findAll();
  }

  // Get All TicketType for filter data
  @Get('/filter-ticket-type')
  findAllWithFilter(
    // For initial default page and limit page
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = DEFAULT_PAGE,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = DEFAULT_PAGE_LIMIT,
    @Query('ticket_type') ticket_type,
  ): Promise<Pagination<TicketType>> {
    return this.ticketTypeService.findAllWithFilter({
      page,
      limit,
      ticket_type,
    });
  }

  // Get Maximun TicketType
  // Route GET => /maximum-ticket-type
  @Get('/maximum-ticket-type/:id')
  findMaximun(@Param('id') id: string) {
    return this.ticketTypeService.findMaximun(+id);
  }

  // Get Only one TicketType
  // Route GET => /ticket-type/1
  @Get(':id')
  find(@Param('id') id: string) {
    return this.ticketTypeService.findById(+id);
  }

  // Create TicketType
  // Route POST => /ticket-type
  @Post()
  create(@Body() newTicket: CreateTicketTypeDto) {
    return this.ticketTypeService.create(newTicket);
  }

  // Update TicketType
  // Route PUT => /ticket-type/1
  @Put(':id')
  update(@Param('id') id: string, @Body() newTicketType: CreateTicketTypeDto) {
    return this.ticketTypeService.update(+id, newTicketType);
  }

  // Delete TicketType
  // Route DELETE => /ticket-type/1
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketTypeService.delete(+id);
  }
}
