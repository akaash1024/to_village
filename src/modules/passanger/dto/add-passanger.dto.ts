import {
  IsString,
  IsOptional,
  IsBoolean,
  Length,
  Matches,
  Min,
  Max,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { GenderEnum } from '@common/enums/passanger.enum';


export class AddPassengerReqDto {
  @ApiProperty({
    example: 'Ramesh Kumar',
  })
  @IsString()
  @Length(2, 150)
  fullName: string;

  @ApiProperty({
    example: '9876543210',
  })
  @IsString()
  mobile: string;

  @ApiPropertyOptional({
    example: 'Male',
  })
  @IsOptional()
  @IsString()
  gender?: GenderEnum;

  @ApiPropertyOptional({
    example: 'Near Bus Stand',
  })
  @IsOptional()
  @IsString()
  addressLine1?: string;

  @ApiPropertyOptional({
    example: 'Shiv Nagar',
  })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiPropertyOptional({
    example: 'Narol',
  })
  @IsOptional()
  @IsString()
  area?: string;

  @ApiPropertyOptional({
    example: 'Ahmedabad',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: 'Gujarat',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: '382405',
  })
  @IsOptional()
  @Matches(/^\d{6}$/, {
    message: 'Invalid Indian pincode',
  })
  pincode?: string;

  @ApiPropertyOptional({
    example: 'Suresh Kumar',
  })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiPropertyOptional({
    example: '9876543211',
  })
  @IsOptional()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Invalid emergency contact number',
  })
  emergencyContactNumber?: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @ApiPropertyOptional({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}