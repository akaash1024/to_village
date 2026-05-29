import { Module } from '@nestjs/common';
import { ReRescheduleBookingController } from './re-schedule-booking.controller';
import { ReRescheduleBookingService } from './re-schedule-booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from '@assets/cp-entity';
import { Locations } from '@entities/location';
import { User } from '@entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Locations, User]), ],
  controllers: [ReRescheduleBookingController],
  providers: [ReRescheduleBookingService],
})
export class RescheduleBookingModule {}



