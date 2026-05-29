import { ApiProperty } from '@nestjs/swagger';

export class AddLocationResDto {
  @ApiProperty({
    example: 'CL001LC001',
    description: 'Generated Location ID',
  })
  locationId: string;
}
