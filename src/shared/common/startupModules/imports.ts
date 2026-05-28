import { DynamicModule, ForwardReference } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { OrmService } from '@common/utils/entity.service';

export function getDefaultImports(): Array<
  DynamicModule | Promise<DynamicModule> | ForwardReference
> {
  const nodeEnv = process.env.NODE_ENV;
  let envFilePath: string;

  // Determine which env file to use based on NODE_ENV
  if (nodeEnv === 'development') {
    envFilePath = '.env.development';
  } else if (nodeEnv === 'production') {
    envFilePath = '.env.production';
  } else if (nodeEnv === 'test') {
    envFilePath = '.env.test';
  } else {
    // Local environment (NODE_ENV not set or empty) - use .env
    envFilePath = '.env';
  }

  return [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get<string>('JWT_EXPIRES_IN')),
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<string>('DB_TYPE') as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        schema: configService.get<string>('DB_SCHEMA', 'public'),
        logging: configService.get<boolean>('DB_LOGGING', false),
        // synchronize: configService.get<string>('ENV_TYPE') !== 'LOCAL',
        entities: OrmService.getAllEntitys(),
        // name: 'admin-panel',
        migrations: ['dist/migrations/**/*.js'],
        subscribers: ['dist/subscriber/**/*.js'],
      }),
    }),
  ];
}
