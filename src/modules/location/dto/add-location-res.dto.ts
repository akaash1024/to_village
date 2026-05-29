import { ApiProperty } from '@nestjs/swagger';

export class AddLocationResDto {
  @ApiProperty({
    example: 'cl001lc001',
    description: 'Generated Location ID',
  })
  locationId: string;
}
