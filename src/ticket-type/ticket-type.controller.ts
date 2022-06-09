import { Controller, Get, Param } from '@nestjs/common';
import { TicketType } from './entities/ticket-type.entity';
import { TicketTypeService } from './ticket-type.service';

@Controller('ticket-type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  // Get All TicketType
  // Route /ticket-type
  @Get()
  findAll(): Promise<TicketType[]> {
    return this.ticketTypeService.findAll();
  }

  // Get Only one TicketType
  // Rou"te /ticket-type/1
  @Get(':id')
  find(@Param('id') id: string): Promise<TicketType[]> {
    return this.ticketTypeService.findById(id);
  }
}
