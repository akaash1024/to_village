import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user';
import { Locations } from '@entities/location';


@Module({
  imports: [TypeOrmModule.forFeature([User, Locations])],
  providers: [LoginService],
  controllers: [LoginController],
  exports: [LoginService, TypeOrmModule],
})
export class LoginModule {}
