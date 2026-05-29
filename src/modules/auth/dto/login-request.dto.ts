import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATION_MESSAGES } from '@common/constants';

export class LoginRequest {
  @IsString({ message: VALIDATION_MESSAGES.MUST_BE_STRING('username') })
  @ApiProperty({
    example: 'akash.kevat',
    description: 'Unique username used for login',
  })
  username: string;

  @IsString({ message: VALIDATION_MESSAGES.MUST_BE_STRING('Password') })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.AUTH.PASSWORD_REQUIRED })
  @ApiProperty({
    example: 'akash.kevat',
    description: 'User password (minimum 8 characters)',
    minLength: 8,
  })
  password: string;
}
