import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from '@assets/cp-entity';
import { Locations } from '@entities/location';
import { User } from '@entities/user';
import { BookingActivityLog } from '../booking-activity-log/booking-activity-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Locations, User]), BookingActivityLog],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
