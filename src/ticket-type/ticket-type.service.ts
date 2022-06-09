import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketTypeDto } from './dto/ticket-type.dto';
import { TicketType } from './entities/ticket-type.entity';

@Injectable()
export class TicketTypeService {
  constructor(
    @InjectRepository(TicketType)
    private readonly ticketTypeRepository: Repository<TicketType>,
  ) {}

  async findAll(): Promise<TicketType[]> {
    return await this.ticketTypeRepository.find();
  }

  async findById(id: number) {
    const result = await this.ticketTypeRepository.findOne(id);
    return result;
  }

  async create(newTicketType: CreateTicketTypeDto) {
    const ticketType = new TicketType();
    ticketType.ticket_type = newTicketType.ticket_type;
    ticketType.price = newTicketType.price;
    ticketType.daily_quota = newTicketType.daily_quota;
    ticketType.minimum = newTicketType.minimum;

    const result = await this.ticketTypeRepository.save(ticketType);

    return result;
  }

  async update(id: number, newTicketType: CreateTicketTypeDto) {
    const updateTicket = await this.ticketTypeRepository.findOneOrFail(id);
    updateTicket.ticket_type = newTicketType.ticket_type;
    updateTicket.price = newTicketType.price;
    updateTicket.daily_quota = newTicketType.daily_quota;
    updateTicket.minimum = newTicketType.minimum;

    const result = await this.ticketTypeRepository.save(updateTicket);

    return result;
  }

  async delete(id: number) {
    const deleteTicket = await this.ticketTypeRepository.findOneOrFail(id);

    const deleted = await this.ticketTypeRepository.delete({
      id: deleteTicket.id,
    });

    return deleted;
  }
}
