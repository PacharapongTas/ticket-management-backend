import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketType } from './entities/ticket-type.entity';
import { TicketTypeController } from './ticket-type.controller';
import { TicketTypeService } from './ticket-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketType])],
  providers: [TicketTypeService],
  controllers: [TicketTypeController],
  exports: [TicketTypeService],
})
export class TicketTypeModule {}
