import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketBooking } from './entites/ticket.entity';

@Injectable()
export class TicketBookingService {
  constructor(
    @InjectRepository(TicketBooking)
    private readonly ticketBooking: Repository<TicketBooking>,
  ) {}

  async findAll(): Promise<TicketBooking[]> {
    return await this.ticketBooking.find();
  }
}
