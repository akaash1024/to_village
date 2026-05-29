// cancel-booking.req.dto.ts

import {
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CancelBookingReqDto {
  @ApiPropertyOptional({
    example: 'Passenger unavailable',
  })
  @IsOptional()
  @IsString()
  cancelReason?: string;
}