/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
export class LoginResponse {
  @ApiProperty()
  token: string;
}

export class LoginErrorResponse<T = null> {
  @ApiResponseProperty({
    example: 400,
    type: 'number',
  })
  statusCode = 400;

  @ApiResponseProperty({
    example: 'Invalid credentials',
    type: 'string',
  })
  message: string;

  @ApiResponseProperty()
  data: T | [] | Record<string, any>;

  constructor(data?: T | [] | Record<string, any>) {
    if (data !== undefined) this.data = data;
  }

  @ApiResponseProperty({
    example: 'Invalid paramter',
    type: 'string',
  })
  error: string;
}
