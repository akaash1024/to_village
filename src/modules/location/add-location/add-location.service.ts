import {
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import axios from 'axios';
import { randomUUID } from 'crypto';

import { Locations } from '@entities/location';
import { User } from '@entities/user';

import { AddLocationReqDto } from '../dto/add-location-req.dto';
import { AddLocationResDto } from '../dto/add-location-res.dto';

import {
  GenericResponse,
  errorResponse,
  sendResponse,
} from '@common/http/response';

import { ClientMessages } from '@common/constants/messages/client.messages';
import { LocationMessages } from '@common/constants/messages/location.messages';

export enum UserType {
  CLIENT_USER = 'ClientUser',
  LOCATION_USER = 'LocationUser',
}

@Injectable()
export class AddLocationService {
  private readonly logger = new Logger(AddLocationService.name);

  constructor(
    @InjectRepository(Locations)
    private readonly locationRepo: Repository<Locations>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async addLocation(
    dto: AddLocationReqDto,
    userId: number,
    token: string,
  ): Promise<GenericResponse<AddLocationResDto>> {
    /**
     * VALIDATE CLIENT
     */
    const client = await this.userRepo.findOne({
      where: {
        clientId: dto.clientId,
        userId,
        userType: UserType.CLIENT_USER,
        isDeleted: false,
      },
    });

    if (!client) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ClientMessages.NOT_FOUND,
        `Client with id ${dto.clientId} does not exist`,
      );
    }

    /**
     * PERMISSION CHECK
     */
    if (client.cuNumber !== '00') {
      return errorResponse(
        HttpStatus.FORBIDDEN,
        ClientMessages.PERMISSION_DENIED,
        'Permission is not allowed to add location',
      );
    }

    /**
     * CHECK DUPLICATE LOCATION
     */
    const existingLocation = await this.locationRepo
      .createQueryBuilder('location')
      .where(
        'LOWER(location.locationName) = LOWER(:locationName)',
        {
          locationName: dto.locationName,
        },
      )
      .andWhere('location.clientId = :clientId', {
        clientId: dto.clientId,
      })
      .andWhere('location.isDeleted = false')
      .getOne();

    if (existingLocation) {
      return errorResponse(
        HttpStatus.CONFLICT,
        LocationMessages.ALREADY_EXISTS,
        `Location with name ${dto.locationName} already exists`,
      );
    }

    /**
     * START TRANSACTION
     */
    const queryRunner =
      this.locationRepo.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      /**
       * GENERATE IDS
       */
      const locationId = randomUUID();

      const lcCode = Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

      /**
       * CREATE LOCATION
       */
      const location = queryRunner.manager.create(Locations, {
        locationId,
        clientId: dto.clientId,
        lcCode,

        locationName: dto.locationName,

        addressLine1: dto.addressLine1 ?? null,
        addressLine2: dto.addressLine2 ?? null,

        subDomain: dto.subDomain ?? null,

        onboardingDate: dto.onboardingDate
          ? new Date(dto.onboardingDate)
          : null,

        pincode: dto.pincode ?? null,

        city: dto.city ?? null,
        state: dto.state ?? null,

        contactNumber: dto.contactNumber ?? null,
        contactEmail: dto.contactEmail ?? null,

        websiteUrl: dto.websiteUrl ?? null,

        contactPersonFirstName:
          dto.contactPersonFirstName ?? null,

        contactPersonLastName:
          dto.contactPersonLastName ?? null,

        contactPersonEmail:
          dto.contactPersonEmail ?? null,

        contactPersonPhone:
          dto.contactPersonPhone ?? null,

        isActive: true,
        isDeleted: false,

        createdBy: userId,
        updatedBy: userId,
      });

      await queryRunner.manager.save(location);

      /**
       * UPDATE USER WITH NEW LOCATION ID
       */
      const updatedLocationIds = client.locationIds?.includes(locationId)
        ? client.locationIds
        : [...(client.locationIds || []), locationId];

      await queryRunner.manager.update(
        User,
        { userId: client.userId },
        {
          locationIds: updatedLocationIds,
        },
      );

      /**
       * COMMIT TRANSACTION
       */
      await queryRunner.commitTransaction();

      return sendResponse(
        'Location added successfully',
        {
          locationId: location.locationId,
        },
        HttpStatus.CREATED,
      );
    } catch (error) {
      /**
       * ROLLBACK
       */
      await queryRunner.rollbackTransaction();

      this.logger.error(
        'Add Location Error',
        error instanceof Error
          ? error.stack
          : JSON.stringify(error),
      );

      return errorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        LocationMessages.INTERNAL_ERROR ||
          'Internal Server Error',
        error instanceof Error
          ? error.message
          : String(error),
      );
    } finally {
      /**
       * RELEASE CONNECTION
       */
      await queryRunner.release();
    }
  }
}