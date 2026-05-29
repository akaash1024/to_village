import { Controller, Post, Req, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogoutService } from './logout.service';
import { sendResponse, errorResponse } from '@common/http';
import { RESPONSE_MESSAGES } from '@common/constants';
import { AuthGuard } from '@common/authentication/authentication.guard';
import type { Request } from 'express';

@ApiTags('AUTH')
@Controller('admin/auth')
export class LogoutController {
    constructor(private readonly logoutService: LogoutService) { }

    @Post('logout')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Logout', description: 'Invalidate the current auth token.' })
    @ApiResponse({ status: 200, description: 'Logout successful' })
    async logout(@Req() req: Request) {
        try {
            const authHeader = req.headers.authorization || '';
            const token = authHeader.startsWith('Bearer ')
                ? authHeader.slice(7)
                : authHeader;

            await this.logoutService.logout(token);

            return sendResponse(RESPONSE_MESSAGES.AUTH.LOGOUT_SUCCESS, {}, HttpStatus.OK);
        } catch (error: unknown) {
            return errorResponse(
                HttpStatus.BAD_REQUEST,
                RESPONSE_MESSAGES.AUTH.LOGOUT_FAILED,
                error instanceof Error ? error.message : String(error),
            );
        }
    }
}