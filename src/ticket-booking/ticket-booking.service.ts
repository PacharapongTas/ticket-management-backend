import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketBookingDto } from './dto/ticket-booking.dto';
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

  async findById(id: number): Promise<TicketBooking> {
    return await this.ticketBookingRepository.findOneOrFail(id);
  }

  async create(newTicketBooking: CreateTicketBookingDto) {
    const ticketBooking = new TicketBooking();
    ticketBooking.created_at = newTicketBooking.created_at;
    ticketBooking.updated_at = newTicketBooking.updated_at;
    ticketBooking.deleted_at = newTicketBooking.deleted_at;

    const result = await this.ticketBookingRepository.save(ticketBooking);

    return result;
  }

  async update(id: number, newTicketBooking: CreateTicketBookingDto) {
    const updateTicketBooking =
      await this.ticketBookingRepository.findOneOrFail(id);
    updateTicketBooking.created_at = newTicketBooking.created_at;
    updateTicketBooking.updated_at = newTicketBooking.updated_at;
    updateTicketBooking.deleted_at = newTicketBooking.deleted_at;

    const result = await this.ticketBookingRepository.save(updateTicketBooking);

    return result;
  }

  async delete(id: number) {
    const deleteTicketBooking =
      await this.ticketBookingRepository.findOneOrFail(id);

    const deleted = await this.ticketBookingRepository.delete({
      id: deleteTicketBooking.id,
    });

    return deleted;
  }
}
