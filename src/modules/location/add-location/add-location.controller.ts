import { AuthGuard } from '@common/authentication/authentication.guard';
//import { PermissionsGuard } from '@common/authentication/permissions.guard';
import {
  ApiGenericResponse,
  errorResponse,
  GenericResponse,
} from '@common/http/response';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AddLocationResDto } from '../dto/add-location-res.dto';
import { AddLocationReqDto } from '../dto/add-location-req.dto';
import { AddLocationService } from './add-location.service';

@ApiTags('Locations')
@Controller('locations')
export class AddLocationController {
  constructor(private addLocationService: AddLocationService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add Location' })
  @ApiResponse({
    status: 201,
    description: 'Add Locations',
    type: ApiGenericResponse(AddLocationResDto),
  })
  async AddLocations(
    @Body() dto: AddLocationReqDto,
    @Req() request,
  ): Promise<GenericResponse<AddLocationResDto>> {
    try {
      const userId = await request.user?.id;
      const token = request.headers.authorization?.split(' ')[1];
      return this.addLocationService.addLocation(dto, userId, token);
    } catch (err) {
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Add Location failed',
        err as string,
      );
    }
  }
}
