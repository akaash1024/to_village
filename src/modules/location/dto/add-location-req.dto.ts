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
  @ApiProperty({ example: 'cl001' })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty({ example: 'Odhav Main Branch' })
  @IsNotEmpty()
  @IsString()
  locationName: string;

  @ApiProperty({ example: 'Near Guru Govind Dham' })
  @IsNotEmpty()
  @IsString()
  addressLine1?: string;

  @ApiPropertyOptional({ example: 'Near Vijay Nagar Square' })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiPropertyOptional({ example: 'odhav-branch' })
  @IsOptional()
  @IsString()
  subDomain?: string;

  @ApiProperty({ example: '2026-05-30' })
  @IsDateString()
  onboardingDate?: string;

  @ApiProperty({ example: '382415' })
  @IsString()
  pincode?: string;

  @ApiProperty({ example: 'Odhav' })
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Uttar Pradesh' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: '+918866113073' })
  @IsString()
  contactNumber?: string;

  @ApiProperty({ example: 'contact@odhavbranch.com' })
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({ example: 'https://www.odhavbranch.com' })
  @IsString()
  websiteUrl?: string;

  @ApiProperty({ example: 'Govind' })
  @IsString()
  contactPersonFirstName?: string;

  @ApiProperty({ example: 'Kevat' })
  @IsString()
  contactPersonLastName?: string;

  @ApiProperty({ example: '1993-02-07' })
  @IsDateString()
  contactPersonDob?: string;

  @ApiProperty({ example: 'govind.kevat@gmail.com' })
  @IsEmail()
  contactPersonEmail?: string;

  @ApiProperty({ example: '+918866113073' })
  @IsString()
  contactPersonPhone?: string;
}
