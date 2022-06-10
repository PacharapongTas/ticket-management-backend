import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TicketTypeService } from 'src/ticket-type/ticket-type.service';
import { Between, FindConditions, JoinOptions, Repository } from 'typeorm';
import { DEFAULT_TIME_ZONE } from 'utils/constants';
import { CreateTicketBookingDto } from './dto/create-ticket-booking.dto';
import { GetTicketBookingArgs } from './dto/get-ticket-booking.dto';
import { TicketBooking } from './entites/ticket-booking.entity';

@Injectable()
export class TicketBookingService {
  constructor(
    @InjectRepository(TicketBooking)
    private readonly ticketBookingRepository: Repository<TicketBooking>,
    private readonly ticketTypeService: TicketTypeService,
  ) {}

  // Maybe can improve
  async findAll({
    page,
    limit,
    ticket_type_id,
    created_at,
  }: GetTicketBookingArgs): Promise<Pagination<TicketBooking>> {
    const where: FindConditions<TicketBooking> = {};

    if (ticket_type_id) {
      where.ticket_type_id = ticket_type_id;
    }

    if (created_at) {
      where.created_at = Between(
        dayjs(created_at, DEFAULT_TIME_ZONE).startOf('day').toDate(),
        dayjs(created_at, DEFAULT_TIME_ZONE).endOf('day').toDate(),
      );
    }

    return paginate<TicketBooking>(
      this.ticketBookingRepository,
      {
        page,
        limit,
      },
      { where },
    );
  }

  async findById(id: number): Promise<TicketBooking> {
    return await this.ticketBookingRepository.findOneOrFail(id);
  }

  // Maybe can improve
  async create(newTicketBooking: CreateTicketBookingDto) {
    // Select with Query Builder
    const bookingAvailable = await this.ticketBookingRepository
      .createQueryBuilder('ticket_booking')
      .where(`DATE_FORMAT(created_at, '%Y-%m-%d') = CURDATE()`)
      .andWhere(`ticket_type_id = :ticket_type_id`, {
        ticket_type_id: newTicketBooking.ticket_type_id,
      })
      .getMany();

    if (bookingAvailable.length) {
      const ticketDailyQuota = await this.ticketTypeService.findById(
        +bookingAvailable[0]?.ticket_type_id,
      );

      if (ticketDailyQuota.daily_quota <= bookingAvailable.length) {
        throw new HttpException(
          'Ticket has out of quota per days',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const ticketBooking = new TicketBooking();

    ticketBooking.ticket_type_id = newTicketBooking.ticket_type_id;

    const result = await this.ticketBookingRepository.save(ticketBooking);

    return result;
  }

  async update(id: number, newTicketBooking: CreateTicketBookingDto) {
    const updateTicketBooking =
      await this.ticketBookingRepository.findOneOrFail(id);

    const bookingAvailable = await this.ticketBookingRepository.findOne({
      ticket_type_id: newTicketBooking.ticket_type_id,
    });

    if (bookingAvailable) {
      throw new HttpException(
        'Ticket has been Booking',
        HttpStatus.BAD_REQUEST,
      );
    }

    updateTicketBooking.ticket_type_id = newTicketBooking.ticket_type_id;

    const result = await this.ticketBookingRepository.save(updateTicketBooking);

    return result;
  }

  async delete(id: number) {
    const deleteTicketBooking =
      await this.ticketBookingRepository.findOneOrFail(id);

    try {
      const deleted = await this.ticketBookingRepository.delete({
        id: deleteTicketBooking.id,
      });

      return deleted;
    } catch (error) {
      throw new HttpException(error?.sqlMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
