// reschedule-booking.req.dto.ts

import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class RescheduleBookingReqDto {
  @ApiProperty({
    example: '2026-06-05',
  })
  @IsDateString()
  journeyDate: Date;

  @ApiPropertyOptional({
    example: 'Passenger requested date change',
  })
  @IsOptional()
  @IsString()
  remarks?: string;
}