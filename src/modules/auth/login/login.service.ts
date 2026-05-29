import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { errorResponse } from '@common/http/response';
import { RESPONSE_MESSAGES } from '@common/constants';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from './../dto/login-response.dto';
import { User, UserType } from '@entities/user';
import { Locations } from '@entities/location';
import { daily } from '@common/decorators';
import { ConnectionService } from '@assets/connection';
import axios from 'axios';

interface JwtPayload {
  sub: string | number;
  role: string | number;
  locationId: string | undefined;
}
enum action {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

@Injectable()
export class LoginService {
  @daily()
  private ormEntity({ ...options }): any {
    return options.return(options);
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Locations)
    private readonly locationRepo: Repository<Locations>,

    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly connectionService: ConnectionService,
  ) {}

  async login({ username, password, ipAddress }): Promise<LoginResponse> {
    const user: User | null = await this.userRepository.findOne({
      where: [
        { username: username as string },
        { email: username as string },
        { userCode: username },
      ],
      select: {
        username: true,
        userTokens: true,
        password: true,
        userId: true,
        userType: true,
        locationIds: true,
        lastLoginLocation: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        errorResponse(
          HttpStatus.BAD_REQUEST,
          RESPONSE_MESSAGES.AUTH.USER_NOT_FOUND,
          RESPONSE_MESSAGES.AUTH.INVALID_PARAMTER,
        ),
      );
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password as string,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException(
        errorResponse(
          HttpStatus.BAD_REQUEST,
          RESPONSE_MESSAGES.AUTH.INVALID_CREDENTIALS,
          RESPONSE_MESSAGES.AUTH.INVALID_PARAMTER,
        ),
      );

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret)
      throw new Error(RESPONSE_MESSAGES.AUTH.JWT_SECRET_NOT_DEFINED);

    const validTokens: string[] = [];
    const expiredTokens: string[] = [];

    if (user?.userTokens?.length) {
      for (const token of user?.userTokens) {
        try {
          // Verify token signature and expiration
          await this.jwtService.verify(token, {
            secret: jwtSecret,
          });
          validTokens.push(token); // still valid
        } catch (err) {
          // token is expired or invalid
          expiredTokens.push(token);
        }
      }
    }
    // Remove expired tokens from DB
    if (expiredTokens.length > 0) {
      const updatedToken = user?.userTokens?.filter(
        (token) => !expiredTokens.includes(token),
      );

      await this.userRepository.update(
        { userId: user.userId },
        { userTokens: updatedToken },
      );

      const entities = await this.ormEntity({
        database: process.env.ADMIN_DB_NAME,
        entities: ['UserToken'],
      });




      await this.connectionService.removeLocation(entities['key']);
    }

    // if (validTokens.length >= 2 && process.env.NODE_ENV !== 'development') {
    //   throw new UnauthorizedException(
    //     RESPONSE_MESSAGES.AUTH.TOKEN_MAXIMUM_LIMIT,
    //   );
    // }
    //

    const locationId = await this.fetchCurrentLocation({
      ...user,
    });

    const payload: JwtPayload = {
      sub: user.userId.toString(),
      role: user.userType,
      locationId,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const updatedUserTokens = user?.userTokens?.length
      ? [...user?.userTokens, accessToken]
      : [accessToken];

    const userTokenUpdated: User = {
      ...user,
      userTokens: updatedUserTokens,
      lastLoginTime: new Date(),
    };

    // 4️⃣ Save token in DB
    await this.userRepository.save(userTokenUpdated);

    // update token inside the admin potal
    if (user?.userType === UserType.CLIENT_USER) {
      const entities = await this.ormEntity({
        database: process.env.ADMIN_DB_NAME,
        entities: ['UserToken'],
      });




      // const activityLog = lastLoginActivityRepo.create({
      //   action: action.LOGIN,
      //   ipAddress: ipAddress || undefined,
      //   title: 'Logged in into Customer Portal',
      //   user_id: user?.userId,
      //   source: 'Customer Portal',
      // });

      

      // await lastLoginActivityRepo.save(activityLog).catch((err) => {
      //   Logger.log(err.message);
      // });

      await this.connectionService.removeLocation(entities['key']);
    }

    // update token inside the admin potal
    if (user?.userType === UserType.LOCATION_USER) {
      const entities = await this.ormEntity({
        database: process.env.ADMIN_DB_NAME,
        entities: ['UserToken'],
      });

      
      


    

      // await lastLoginActivityRepo.save(activityLog).catch((err) => {
      //   Logger.log(err.message);
      // });

      await this.connectionService.removeLocation(entities['key']);
    }

    // call this function to open connection
    // await this.getLocationByUserService.openConnectionForLoginUser(payload);

    //axios call
    // --- AXIOS CALL: Verify/Create Default Data on Login ---

    

    return {
      token: accessToken,
    };
  }
 

  async fetchCurrentLocation(userData) {
    try {
      //  check if the login user type is client user or not

      if (userData?.userType === UserType.CLIENT_USER) {
        let locationId = '';
        if (userData?.locationIds?.length) {
          const formatted = `(${userData?.locationIds.map((id) => `'${id}'`).join(', ')})`;

          const locations = await this.locationRepo.query(`
              SELECT location.location_id AS "locationId"
              FROM locations location
              WHERE location.location_id IN ${formatted}
              ORDER BY LOWER(location.location_name) ASC;`);

          if (!locations?.length) {
            return locationId;
          }
          locationId = userData?.lastLoginLocation || locations[0]?.locationId;
          return locationId;
        }

        return locationId;
      }

      //   If the login User Is Location user Or Not

      if (userData?.userType === UserType.LOCATION_USER) {
        let locationId = '';

        if (userData?.locationIds?.length) {
          const locations = await this.locationRepo.find({
            where: {
              locationId: In(userData?.locationIds),
            },
            select: {
              locationId: true,
            },
          });

          if (!locations?.length) {
            return locationId;
          }
          locationId = locations[0]?.locationId ?? '';
          return locationId;
        }
        return locationId;
      }
    } catch (error: any) {
      Logger.error(
        'Error Occured Inside The fetchCurrentLocation ---->',
        error?.message,
      );
    }
  }
}
