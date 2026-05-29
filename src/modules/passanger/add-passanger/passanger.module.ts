import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';

import { CreatePassangerController } from './passanger.controller';
import { PassangerService } from './passanger.service';
import { Passenger } from '@assets/cp-entity/passanger';
import { Locations } from '@entities/location';
import { User } from '@entities/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passenger, Locations, User]),
    AuthModule,
  ],
  controllers: [CreatePassangerController],
  providers: [PassangerService],
})
export class CreatePassangerModule {}
