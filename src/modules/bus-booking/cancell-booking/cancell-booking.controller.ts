import {
  Body,
  Controller,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@common/authentication';

import { CancellBookingService } from './cancell-booking.service';

import { CancelBookingReqDto } from '../dto/cancel-booking.req.dto';

@ApiTags('Booking')
@Controller('booking')
export class CancellBookingController {
  constructor(
    private readonly cancellBookingSvc: CancellBookingService,
  ) {}

  @Patch(':bookingId/cancel')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel Booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking cancelled',
  })
  cancelBooking(
    @Param('bookingId') bookingId: string,
    @Body() dto: CancelBookingReqDto,
    @Req() request: any,
  ) {
    const userId: string = request.user?.id;

    const user = request.user;

    return this.cancellBookingSvc.cancelBooking(
      userId,
      bookingId,
      dto,
      user,
    );
  }
}