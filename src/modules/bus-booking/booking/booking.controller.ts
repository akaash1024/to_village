import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/authentication';
import { CreateBookingReqDto } from '../dto/create-booking.req.dto';
import { BookingService } from './booking.service';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Booking', description: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created' })
  @ApiResponse({ status: 500, description: 'Failed to create booking' })
  createBooking(@Body() dto: CreateBookingReqDto, @Req() request: any) {
    const userId: string = request.user?.id;
    const user = request.user;
    return this.bookingService.createBooking(userId, dto, user);
  }
}



