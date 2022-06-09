import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketBooking } from './entites/ticket-booking.entity';

@Injectable()
export class TicketBookingService {
  constructor(
    @InjectRepository(TicketBooking)
    private readonly ticketBookingRepository: Repository<TicketBooking>,
  ) {}

  async findAll(): Promise<TicketBooking[]> {
    return await this.ticketBookingRepository.find();
  }

  async findById(id): Promise<TicketBooking[]> {
    return await this.ticketBookingRepository.find(id);
  }
}
