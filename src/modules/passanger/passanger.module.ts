import { Module } from '@nestjs/common';
import { CreatePassangerModule } from './add-passanger/passanger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from '@assets/cp-entity';
import { Locations } from '@entities/location';
import { User } from '@entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Locations, User]), CreatePassangerModule],
})
export class PatientModule { }
