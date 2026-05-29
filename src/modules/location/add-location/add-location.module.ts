
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from '@entities/location';
import { User } from '@entities/user';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AddLocationController } from './add-location.controller';
import { AddLocationService } from './add-location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Locations, User]),
    AuthModule,
  ],
  controllers: [AddLocationController],
  providers: [AddLocationService],
})
export class AddLocationModule {}
