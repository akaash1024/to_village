import { errorResponse } from '@common/http';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
// import { UserToken } from '@entities/user';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    // @InjectRepository(UserToken)
    // private userTokenRepository: Repository<UserToken>,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        errorResponse(HttpStatus.UNAUTHORIZED, 'Invalid Token', 'Unauthorized'),
      );
    }
    let payload;
    try {
      // const tokenRecord = await this.userTokenRepository.findOne({
      //   where: { accessToken: token },
      // });
      // if (!tokenRecord) {
      //   throw new UnauthorizedException(
      //     errorResponse(
      //       HttpStatus.BAD_REQUEST,
      //       'Token not found or invalid',
      //       '',
      //     ),
      //   );
      // }

      // payload = await this.jwtService.verifyAsync(tokenRecord.accessToken, {
      //   secret: this.configService.get<string>('JWT_SECRET'),
      // });
      // if (!payload) {
      //   throw new UnauthorizedException(
      //     errorResponse(HttpStatus.BAD_REQUEST, 'Invalid Token', ''),
      //   );
      // }

      // // Check token in DB
      // request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        errorResponse(
          HttpStatus.BAD_REQUEST,
          'Invalid Token',
          error instanceof Error ? error.message : 'Internal server error',
        ),
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];

    if (!authHeader || Array.isArray(authHeader)) return undefined;
    const parts: string[] = authHeader.split(' ');
    const type: string | undefined = parts[0];
    const token: string | undefined = parts[1];
    return type === 'Bearer' ? token : undefined;
  }
}
