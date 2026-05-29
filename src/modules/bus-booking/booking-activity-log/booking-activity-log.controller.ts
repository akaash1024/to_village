import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import {
  ApiExcludeController,
} from '@nestjs/swagger';

import {
  CommonMessages,
} from '@common/constants/messages/common.messages';

import {
  errorResponse,
} from '@common/http';
import { CreateBookingJourneyLogDto } from './dto/booking-activity-log.dto';
import { BookingActivityLogService } from './booking-activity-log.service';





@ApiExcludeController()
@Controller('booking-activity-log')
export class BookingActivityLogController {
  constructor(
    private readonly bookingActivityLogService: BookingActivityLogService,
  ) {}

  @Post('create-booking-activity-log')
  async createBookingActivityLog(
    @Body() dto: CreateBookingJourneyLogDto,
    @Req() req: Request,
  ) {
    try {
      return await this.bookingActivityLogService.createBookingActivityLog(
        dto,
        req,
      );
    } catch (error) {
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        CommonMessages.INTERNAL_ERROR,
        error instanceof Error
          ? error.message
          : String(error),
      );
    }
  }
}