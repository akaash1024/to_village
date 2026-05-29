import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { RescheduleBookingModule } from './re-schedule-booking/re-schedule-booking.module';
import { CancellBookingModule } from './cancell-booking/cancell-booking.module';
import { BookingActivityLog } from './booking-activity-log/booking-activity-log.module';


@Module({
  imports: [BookingModule, RescheduleBookingModule, CancellBookingModule, BookingActivityLog],
})
export class BusBookingModule { }
