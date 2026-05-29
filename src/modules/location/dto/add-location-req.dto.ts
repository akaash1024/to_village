import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  IsNumber,
  ValidateNested,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class AddLocationReqDto {
  @ApiProperty({ example: 'CL001' })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty({ example: 'Indore Main Branch' })
  @IsNotEmpty()
  @IsString()
  locationName: string;

  @ApiProperty({ example: '123 MG Road' })
  @IsNotEmpty()
  @IsString()
  addressLine1?: string;

  @ApiPropertyOptional({ example: 'Near Vijay Nagar Square' })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiPropertyOptional({ example: 'indore-branch' })
  @IsOptional()
  @IsString()
  subDomain?: string;

  @ApiProperty({ example: '2026-02-11' })
  @IsDateString()
  onboardingDate?: string;

  @ApiProperty({ example: '452001' })
  @IsString()
  pincode?: string;

  @ApiProperty({ example: 'Indore' })
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Madhya Pradesh' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  contactNumber?: string;

  @ApiProperty({ example: 'contact@indorebranch.com' })
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({ example: 'https://www.indorebranch.com' })
  @IsString()
  websiteUrl?: string;

  @ApiProperty({ example: 'Rahul' })
  @IsString()
  contactPersonFirstName?: string;

  @ApiProperty({ example: 'Sharma' })
  @IsString()
  contactPersonLastName?: string;

  @ApiProperty({ example: '1990-01-15' })
  @IsDateString()
  contactPersonDob?: string;

  @ApiProperty({ example: 'rahul.sharma@gmail.com' })
  @IsEmail()
  contactPersonEmail?: string;

  @ApiProperty({ example: '+919999999999' })
  @IsString()
  contactPersonPhone?: string;
}
