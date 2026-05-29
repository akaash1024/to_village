import { Module } from '@nestjs/common';
import { CancellBookingController } from './cancell-booking.controller';
import { CancellBookingService } from './cancell-booking.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from '@assets/cp-entity';
import { Locations } from '@entities/location';
import { User } from '@entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Locations, User]), ],
  controllers: [CancellBookingController],
  providers: [CancellBookingService],
})
export class CancellBookingModule {}



