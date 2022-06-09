import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findById(id): Promise<TicketType[]> {
    return await this.ticketTypeRepository.find(id);
  }
}
