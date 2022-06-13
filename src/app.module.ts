import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketBookingModule } from './ticket-booking/ticket-booking.module';
import { ConfigModule } from '@nestjs/config';
import { TicketTypeModule } from './ticket-type/ticket-type.module';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_TYPE,
  DATABASE_USERNAME,
  DB_PORT,
} from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: DATABASE_TYPE,
      host: DATABASE_HOST,
      port: DB_PORT,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      // Make sure synchronize should false on production.
      synchronize: process.env.NODE_ENV == 'test',
      logging: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      cors: {
        credentials: true,
        origin: true,
      },
      // Set typeorm the current time_zone
      timezone: 'Z',
    }),
    TicketBookingModule,
    TicketTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
