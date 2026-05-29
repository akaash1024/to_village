import { Controller, Post, Body, HttpStatus, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import {
  ApiGenericResponse,
  errorResponse,
  GenericResponse,
  sendResponse,
} from '@common/http';
import { RESPONSE_MESSAGES } from '@common/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginErrorResponse, LoginResponse } from './../dto/login-response.dto';
import type { Request } from 'express';
import { LoginRequest } from '../dto/login-request.dto';
@ApiTags('AUTH')
@Controller('admin/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Authenticates the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successfully',
    type: ApiGenericResponse(LoginResponse),
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials',
    type: LoginErrorResponse,
  })
  async login(
    @Body() data: LoginRequest,
    @Req() req: Request,
  ): Promise<GenericResponse<LoginResponse>> {
    try {
      const ipAddress: string =
        (req.headers['x-forwarded-for'] as string) ||
        req.socket?.remoteAddress ||
        '';
      const { username, password } = data;

      const response = await this.loginService.login({
        username,
        password,
        ipAddress,
      });

      return sendResponse(
        RESPONSE_MESSAGES.AUTH.LOGIN_SUCCESS,
        response,
        HttpStatus.OK,
      );
    } catch (error: unknown) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        RESPONSE_MESSAGES.AUTH.LOGIN_FAILED,
        error instanceof Error
          ? error.message
          : RESPONSE_MESSAGES.COMMON.INTERNAL_ERROR,
      );
    }
  }
}
