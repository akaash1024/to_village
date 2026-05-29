import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Passenger } from '@assets/cp-entity';
import { Locations } from '@entities/location';
import { User } from '@entities/user';
import { BookingActivityLogController } from './booking-activity-log.controller';
import { BookingActivityLogService } from './booking-activity-log.service';


@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Locations, User]), ],
  controllers: [BookingActivityLogController],
  providers: [BookingActivityLogService],
  exports: [BookingActivityLogService],
})
export class BookingActivityLog {}
