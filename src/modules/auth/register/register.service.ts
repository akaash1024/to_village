import { RESPONSE_MESSAGES } from '@common/constants';
import { errorResponse, sendResponse } from '@common/http';
import { User } from '@entities/user';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserService {
  private readonly logger = new Logger(RegisterUserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(dto: any) {
    try {
      /**
       * CHECK EMAIL EXISTS
       */
      if (dto.email) {
        const existingEmail = await this.userRepository.findOne({
          where: {
            email: dto.email,
          },
        });

        if (existingEmail) {
          return errorResponse(
            HttpStatus.CONFLICT,
            'Email already exists',
          );
        }
      }

      /**
       * CHECK USERNAME EXISTS
       */
      if (dto.username) {
        const existingUsername = await this.userRepository.findOne({
          where: {
            username: dto.username,
          },
        });

        if (existingUsername) {
          return errorResponse(
            HttpStatus.CONFLICT,
            'Username already exists',
          );
        }
      }

      /**
       * HASH PASSWORD
       */
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      /**
       * GENERATE USER ID
       */
      

      /**
       * CREATE USER
       */
      const user = this.userRepository.create({
        username: dto.username,
        email: dto.email,
        phone: dto.phone,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
        userType: dto.userType,
        designation: dto.designation,
        isActive: dto.isActive ?? true,
        parentEmail: dto.parentEmail,
        isDeleted: false,
        clientId: dto.clientId,
        cuNumber: dto.cuNumber,
        locationIds: dto.locationIds ?? [],
        userTokens: [],
      });

      await this.userRepository.save(user);

      return sendResponse(
        RESPONSE_MESSAGES.USER.CREATED,
        {
          userId: user.userId,
        },
        HttpStatus.CREATED,
      );
    } catch (error) {
      this.logger.error(`Register User Error`, error);

      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGES.COMMON.INTERNAL_ERROR,
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}