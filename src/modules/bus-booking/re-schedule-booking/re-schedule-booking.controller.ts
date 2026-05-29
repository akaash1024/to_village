import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/authentication';
import { ReRescheduleBookingService } from './re-schedule-booking.service';
import { RescheduleBookingReqDto } from '../dto/reschedule-booking.req.dto';

@ApiTags('Booking')
@Controller('booking')
export class ReRescheduleBookingController {
  constructor(private readonly rescheduleSvc: ReRescheduleBookingService) {}

  @Post(':bookingId/reschedule')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Reschedule Booking' })
@ApiResponse({ status: 200, description: 'Booking rescheduled' })
rescheduleBooking(
  @Param('bookingId') bookingId: string,
  @Body() dto: RescheduleBookingReqDto,
  @Req() request: any,
) {
  const userId: string = request.user?.id;
  const user = request.user;

  return this.rescheduleSvc.rescheduleBooking(
    userId,
    bookingId,
    dto,
    user,
  );
}
}



