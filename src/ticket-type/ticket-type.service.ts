import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const ticketTypeActive = await this.ticketTypeRepository.findOne({
      ticket_type: newTicketType.ticket_type,
    });

    if (ticketTypeActive) {
      throw new HttpException(
        'Ticket Type already active',
        HttpStatus.BAD_REQUEST,
      );
    }

    const ticketType = new TicketType();

    ticketType.ticket_type = newTicketType.ticket_type;
    ticketType.price = newTicketType.price;
    ticketType.daily_quota = newTicketType.daily_quota;
    ticketType.minimum = newTicketType.minimum;

    const result = await this.ticketTypeRepository.save(ticketType);

    return result;
  }

  // Shound't update this Ticket-Booking

  async delete(id: number) {
    const deleteTicket = await this.ticketTypeRepository.findOneOrFail(id);
    try {
      const deleted = await this.ticketTypeRepository.delete({
        id: deleteTicket.id,
      });

      return deleted;
    } catch (error) {
      if (error?.errno === 1451) {
        throw new HttpException(
          'Ticket Type already used, You can not delete for now.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(error?.sqlMessage, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
