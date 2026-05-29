// create-booking.req.dto.ts

import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { PaymentModeEnum } from '@common/enums/booking.enum';



export class CreateBookingReqDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  passengerId: number;

  @ApiProperty({
    example: 'Ahmedabad',
  })
  @IsString()
  fromCity: string;

  @ApiProperty({
    example: 'Dahod',
  })
  @IsString()
  toCity: string;

  @ApiProperty({
    example: '2026-06-01',
  })
  @IsDateString()
  journeyDate: Date;

  @ApiPropertyOptional({
    example: 'A1',
  })
  @IsOptional()
  @IsString()
  seatNumber?: string;

  @ApiProperty({
    example: 500,
  })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({
    enum: PaymentModeEnum,
    example: PaymentModeEnum.CASH,
  })
  @IsOptional()
  @IsEnum(PaymentModeEnum)
  paymentMode?: PaymentModeEnum;
}