import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketBookingModule } from './ticket-booking/ticket-booking.module';
import { ConfigModule } from '@nestjs/config';
import { TicketTypeModule } from './ticket-type/ticket-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 1412,
      username: 'root',
      password: 'root',
      database: 'ticket_management',
      synchronize: true,
      logging: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    TicketBookingModule,
    TicketTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
