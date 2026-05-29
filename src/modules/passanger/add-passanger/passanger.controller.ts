import { AuthGuard } from '@common/authentication';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddPassengerReqDto } from '../dto/add-passanger.dto';
import { ApiGenericResponse } from '@common/http';
import { PassangerService } from './passanger.service';

@ApiTags('Passanger')
@Controller('passanger')
export class CreatePassangerController {
  constructor(private readonly createPassangerSvc: PassangerService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create Passanger',
    description: 'Create Passanger',
  })
  @ApiResponse({
    status: 201,
    description: 'Passanger Created successfully',
    type: ApiGenericResponse(AddPassengerReqDto),
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to create Passanger',
  })
  createPassanger(@Body() dto: AddPassengerReqDto, @Req() request: any) {
    const userId: string = request.user?.id;
    const user = request['user'];
    return this.createPassangerSvc.createPassanger(userId, dto, user, request);
  }
}
