import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { RescheduleBookingModule } from './re-schedule-booking/re-schedule-booking.module';
import { CancellBookingModule } from './cancell-booking/cancell-booking.module';


@Module({
  imports: [BookingModule, RescheduleBookingModule, CancellBookingModule],
})
export class BusBookingModule { }
