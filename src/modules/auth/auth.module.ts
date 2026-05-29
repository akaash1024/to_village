import { Locations } from '@entities/location';
import { User } from '@entities/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { LogoutGuard } from '@common/logout.guard';
import { AuthGuard } from '@common/authentication/authentication.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Locations]),
    RegisterUserModule,
    LoginModule,
    LogoutModule,
  ],
  providers: [LogoutGuard, AuthGuard],
  exports: [],
})
export class AuthModule {}
