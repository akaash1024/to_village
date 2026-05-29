import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { errorResponse } from '@common/http';
import { CommonMessages } from '@common/constants/messages/common.messages';
import { RegisterUserService } from './register.service';


@Controller('user')
@ApiTags('User')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) { }
  // @UseGuards(ApiKeyGuard)
  // @ApiSecurity('api-key')
  @ApiBody({
    schema: {
      type: 'object',
      example: {
        username: 'akash.kevat',
        email: 'akash.kevat@example.com',
        phone: '9601046613',
        password: 'akash.kevat',
        userType: 'ClientUser',
        firstName: 'Akash',
        lastName: 'Kevat',
        designation: 'User',
        isActive: true,
        parentEmail: "null",
        isDeleted: false,
        userCode: 'cl001c01',
        cuNumber: null,
        clientId: "cl001",
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'User updated successfully',
        data: {
          id: 2,
        },
      },
    },
  })
  @Post('register-user')
  async createClient(@Body() dto: any) {
    try {
      return await this.registerUserService.registerUser(dto);
    } catch (error) {
      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        CommonMessages.INTERNAL_ERROR,
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
