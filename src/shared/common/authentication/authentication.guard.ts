import { errorResponse } from '@common/http';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, UserType } from '@entities/user';
import { Locations } from '@entities/location';
import axios from 'axios';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,

    private configService: ConfigService,

    @InjectRepository(Locations)
    private readonly locationRepo: Repository<Locations>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const apiSecretKey: string | undefined =
      this.configService.get<string>('API_SECRET_KEY');
    if (!token) {
      throw new UnauthorizedException(
        errorResponse(HttpStatus.UNAUTHORIZED, 'Invalid Token', 'Unauthorized'),
      );
    }

    if (token) {
      const isCheckApiSecretKey: boolean =
        apiSecretKey === token ? true : false;

      // bypass external api by checking authentication using api-secret key
      if (isCheckApiSecretKey) {
        return true;
      }

      // check jwt verification
      if (!isCheckApiSecretKey) {
        let payload;

        try {
          payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET'),
          });
          if (!payload) {
            throw new UnauthorizedException(
              errorResponse(HttpStatus.BAD_REQUEST, 'Invalid Token', ''),
            );
          }

          const userRecord = await this.userRepo.findOne({
            where: { userId: Number(payload.sub) },
            select: {
              username: true,
              email: true,
              parentEmail: true,
              phone: true,
              firstName: true,
              lastName: true,
              userCode: true,
              userType: true,
              designation: true,
              cuNumber: true,
              userId: true,
              clientId: true,
              locationIds: true,
              userTokens: true,
              lastLoginLocation: true,
            },
          });

          if (!userRecord) {
            throw new UnauthorizedException(
              errorResponse(
                HttpStatus.BAD_REQUEST,
                'User not found or invalid',
                '',
              ),
            );
          }

          if (!userRecord?.userTokens?.includes(token)) {
            throw new UnauthorizedException(
              errorResponse(
                HttpStatus.BAD_REQUEST,
                'Token not found or invalid',
                '',
              ),
            );
          }

          const loggedInUserData = await this.openConnectionForLoginUser({
            ...payload,
            ...userRecord,
          });

          if (payload?.roleId) {
            const adminData = await this.userRepo.findOne({
              where: {
                userId: payload?.roleId,
              },
              select: {
                userId: true,
                userType: true,
                clientId: true,
                username: true,
                userCode: true,
                firstName: true,
                lastName: true,
                designation: true,
              },
            });

            loggedInUserData.adminDetails = {
              ...adminData,
            };
          }

          // Check token in DB
          request.user = loggedInUserData;
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
      return false;
    }
    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];

    if (!authHeader || Array.isArray(authHeader)) return undefined;
    const parts: string[] = authHeader.split(' ');
    const type: string | undefined = parts[0];
    const token: string | undefined = parts[1];
    return type === 'Bearer' ? token : undefined;
  }

  async openConnectionForLoginUser(userData: any): Promise<any> {
    try {
      const { sub, role } = userData;

      let finalPayload: any = {
        ...userData,
        locations: [],
        locationId: userData?.locationId || userData?.lastLoginLocation,
        id: Number(sub),
        adminDetails: null,
      };
      //  check if the login user type is client user or not

      if (role === UserType.CLIENT_USER) {
        if (userData?.locationIds?.length) {
          const locations = await this.locationRepo
            .createQueryBuilder('location')
            .where('location.locationId IN (:...ids)', {
              ids: userData?.locationIds,
            })
            .orderBy('LOWER(location.locationName)', 'ASC')
            .getMany();

          if (!locations?.length) {
            Logger.error('No Loction Fetch For This Client User --->', sub);
            return finalPayload;
          }

          finalPayload = {
            ...finalPayload,
            locations,
            locationId: finalPayload?.locationId
              ? finalPayload?.locationId
              : locations[0]?.locationId,
            cuNumber: userData?.cuNumber,
          };
        }

        return finalPayload;
      }

      //   If the login User Is Location user Or Not

      if (role === UserType.LOCATION_USER) {
        const userDetails = await this.userRepo.findOne({
          where: { userId: Number(sub) },
        });
        if (userDetails?.locationIds?.length) {
          const locations = await this.locationRepo
            .createQueryBuilder('location')
            .where('location.locationId IN (:...ids)', {
              ids: userData?.locationIds,
            })
            .orderBy('LOWER(location.locationName)', 'ASC')
            .getMany();

          if (!locations?.length) {
            Logger.error('No Loction Fetch For This Location User --->', sub);
            return;
          }

          finalPayload = {
            ...finalPayload,
            locations,
            locationId: locations[0]?.locationId ?? '',
            cuNumber: userData?.cuNumber,
          };
        }
        return finalPayload;
      }
    } catch (error: any) {
      Logger.error(
        'Error Occured Inside The OpenConnectionForLoginUser --->',
        error?.message,
      );
    }
  }

  async callAdminMoudleApi(token: any, userCode, LocationId) {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.AP_BASE_LOCATION_URL}/api/admin/modules/by-client-user-cp/${userCode}/location/${LocationId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: '',
      };
      const getResponse = await axios.request(config);
      return getResponse?.data?.data;
    } catch (error) {
      Logger.error(
        'Error Occured Inside The callAdminMoudleApi -------->',
        error,
      );
      return true;
    }
  }

  async getLocationUserModuleDetails(token: string) {
    try {
      // call the Admin Panel API To Fetch Location User Deatils

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.AP_BASE_LOCATION_URL}/api/admin/admin/permissions`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: '',
      };

      const getResponse = await axios.request(config);

      return getResponse?.data?.data ?? {};
    } catch (error) {
      Logger.error(
        'Error Occured Inside The getLocationUserModuleDetails -------->',
        error,
      );
      return false;
    }
  }
}
