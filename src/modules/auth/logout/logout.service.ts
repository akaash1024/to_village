import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/user';
import { errorResponse } from '@common/http';
import { RESPONSE_MESSAGES } from '@common/constants';

@Injectable()
export class LogoutService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async logout(token: string): Promise<void> {
    if (!token) {
      throw new UnauthorizedException(
        errorResponse(
          401,
          RESPONSE_MESSAGES.AUTH.TOKEN_REQUIRED,
          RESPONSE_MESSAGES.AUTH.TOKEN_REQUIRED,
        ),
      );
    }

    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .where(':token = ANY(user.user_tokens)', { token })
      .getOne();

    if (!existingUser) {
      throw new UnauthorizedException(
        errorResponse(
          401,
          RESPONSE_MESSAGES.AUTH.TOKEN_INVALID,
          RESPONSE_MESSAGES.AUTH.TOKEN_INVALID,
        ),
      );
    }

    const updatedTokens = existingUser.userTokens?.filter(
      (userToken) => userToken !== token,
    );

    await this.userRepository.update(
      { userId: existingUser.userId },
      { userTokens: updatedTokens },
    );
  }
}
