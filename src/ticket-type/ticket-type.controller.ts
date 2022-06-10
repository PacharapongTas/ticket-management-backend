import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  // Get Only one TicketType
  // Route GET => /ticket-type/1
  @Get(':id')
  find(@Param('id') id: string) {
    console.log('id :>> ', id);
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
  // @Put(':id')
  // Should not have update feature

  // Delete TicketType
  // Route DELETE => /ticket-type/1
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketTypeService.delete(+id);
  }
}
