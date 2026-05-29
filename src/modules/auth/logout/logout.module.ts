import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogoutService } from './logout.service';
import { LogoutController } from './logout.controller';
import { User } from '@entities/user';
import { Locations } from '@entities/location';

@Module({
  imports: [TypeOrmModule.forFeature([User, Locations])],
  providers: [LogoutService],
  controllers: [LogoutController],
  exports: [LogoutService],
})
export class LogoutModule {}
