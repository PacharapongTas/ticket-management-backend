import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TicketBookingService } from 'src/ticket-booking/ticket-booking.service';
import { Between, FindConditions, Repository } from 'typeorm';
import { DEFAULT_TIME_ZONE } from 'utils/constants';
import { GetTicketTypeArgs } from './dto/get-ticket-type.dto';
import { CreateTicketTypeDto } from './dto/ticket-type.dto';
import { TicketType } from './entities/ticket-type.entity';

@Injectable()
export class TicketTypeService {
  constructor(
    @InjectRepository(TicketType)
    private readonly ticketTypeRepository: Repository<TicketType>,
    @Inject(forwardRef(() => TicketBookingService))
    private readonly ticketBookingService: TicketBookingService,
  ) {}

  async findAll(): Promise<TicketType[]> {
    return await this.ticketTypeRepository.find();
  }

  async findAllWithFilter({
    page,
    limit,
    ticket_type,
  }: GetTicketTypeArgs): Promise<Pagination<TicketType>> {
    const where: FindConditions<TicketType> = {};

    if (ticket_type) {
      where.ticket_type = ticket_type;
    }

    return paginate<TicketType>(
      this.ticketTypeRepository,
      {
        page,
        limit,
      },
      { where },
    );
  }

  async findMaximun(id: number) {
    const result = await this.ticketBookingService.findMaximumById(id);
    return result;
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
  async update(id: number, newTicketType: CreateTicketTypeDto) {
    const updateTicket = await this.ticketTypeRepository.findOneOrFail(id);

    const ticketTypeActive = await this.ticketTypeRepository.findOne({
      ticket_type: newTicketType.ticket_type,
    });

    if (
      ticketTypeActive &&
      updateTicket.ticket_type !== newTicketType.ticket_type
    ) {
      throw new HttpException(
        'Ticket Type already active',
        HttpStatus.BAD_REQUEST,
      );
    }

    updateTicket.ticket_type = newTicketType.ticket_type;
    updateTicket.price = newTicketType.price;
    updateTicket.daily_quota = newTicketType.daily_quota;
    updateTicket.minimum = newTicketType.minimum;

    const result = await this.ticketTypeRepository.save(updateTicket);

    return result;
  }

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
