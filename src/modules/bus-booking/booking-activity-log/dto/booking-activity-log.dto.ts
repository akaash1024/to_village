import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  BookingStatusEnum,
  PaymentModeEnum,
  PaymentStatusEnum,
} from '@common/enums/booking.enum';



export class CreateBookingJourneyLogDto {
  @IsString()
  @IsNotEmpty()
  bookingId: string;

  @IsEnum(BookingStatusEnum)
  bookingStatus: BookingStatusEnum;

  @IsEnum(PaymentStatusEnum)
  paymentStatus: PaymentStatusEnum;

  @IsOptional()
  @IsEnum(PaymentModeEnum)
  paymentMode?: PaymentModeEnum;

  @IsOptional()
  @IsString()
  locationId?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}