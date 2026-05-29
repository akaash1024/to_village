import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddPassengerReqDto } from '../dto/add-passanger.dto';
import { GenericResponse, errorResponse, sendResponse } from '@common/http/response';
import { Locations } from '@entities/location';
import { daily } from '@common/decorators';
import { RESPONSE_MESSAGES } from '@common/constants';

@Injectable()
export class PassangerService {

    constructor(
        @InjectRepository(Locations)
        private readonly locationRepo: Repository<Locations>,
    ) { }

    @daily()
    private ormEntity({ ...options }): any {
        return options.return(options);
    }

    @daily()
    private closeConnection({ ...options }) {
        return options.return(options);
    }

    private addPassangerKey: string;

    async createPassanger(userId: string, dto: AddPassengerReqDto, user: any, req: any): Promise<GenericResponse<any>> {
      try {
        const passangerDynamicConnection = await this.ormEntity({
          database: user.locationId,
          entities: ['Passenger'],
        });

        this.addPassangerKey = passangerDynamicConnection['key'];

        const passengerRepo: Repository<any> = passangerDynamicConnection['Passenger'];

        // check duplicate by passengerId or mobile
        // generate passengerId if not provided
        const passengerId = `PSG${Date.now()}`;

        const existingPassenger = await passengerRepo
          .createQueryBuilder('passenger')
          .where('passenger.mobile = :mobile', { mobile: dto.mobile })
          .andWhere('passenger.isDeleted = false')
          .getOne();

        if (existingPassenger) {
          return errorResponse(
            HttpStatus.CONFLICT,
            'Passenger already exists',
            `Mobile ${dto.mobile} is already registered`,
          );
        }

        const payload = {
          passengerId,
          fullName: dto.fullName,
          mobile: dto.mobile,
          gender: dto.gender ?? null,
          addressLine1: dto.addressLine1 ?? null,
          addressLine2: dto.addressLine2 ?? null,
          area: dto.area ?? null,
          city: dto.city ?? null,
          state: dto.state ?? null,
          pincode: dto.pincode ?? null,
          emergencyContactName: dto.emergencyContactName ?? null,
          emergencyContactNumber: dto.emergencyContactNumber ?? null,
          isActive: dto.isActive ?? true,
          isBlocked: dto.isBlocked ?? false,
          isDeleted: dto.isDeleted ?? false,
          createdBy: userId,
          updatedBy: userId,
        };

        const passenger = passengerRepo.create(payload);
        const saved = await passengerRepo.save(passenger);

        return sendResponse('Passenger created successfully', { passengerId: saved.passengerId }, HttpStatus.CREATED);
      } catch (error) {
        Logger.error('Create Passenger Error', error instanceof Error ? error.stack : JSON.stringify(error));

        if ((error as any)?.status) {
          throw error;
        }

        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to create passenger', (error as any)?.message ?? String(error));
      } finally {
        await this.closeConnection({
          database: this.addPassangerKey,
        });
      }
    }
}
