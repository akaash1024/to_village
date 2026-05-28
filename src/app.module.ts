import { getDefaultImports } from '@common/startupModules/imports';
import { Module } from '@nestjs/common';



@Module({
  imports: [...getDefaultImports(),],
  controllers: [],
  providers: [],
})
export class AppModule {}
