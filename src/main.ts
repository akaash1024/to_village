import * as os from 'os';
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { RESPONSE_MESSAGES } from "@common/constants";
import { HttpStatus, Logger, ValidationPipe } from "@nestjs/common";
import { swaggerAuth } from '@common/authentication/swagger.middleware';
import Color from 'colors';



async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService);

    app.use(express.json({ limit: '20mb' }));



    // Simple health check endpoint
    app.getHttpAdapter().get('/health', (_req, res) => {
      res.json({
        status: 'ok',
        message: RESPONSE_MESSAGES.COMMON.SUCCESS,
        timestamp: new Date().toISOString(),
      });
    });

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, stopAtFirstError: true })
    )

    app.enableCors({
      origin: '*',
      credentials: true,
      exposedHeaders: ['Content-Disposition'],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });


    const swaggerConfig = new DocumentBuilder()
      .setTitle('API')
      .setVersion('1.0')
      .setDescription('Customer Portal API Documentation')
      .addBearerAuth()
      .addGlobalResponse(
        {
          status: HttpStatus.BAD_REQUEST,
          description: 'Bad Request Response',
          schema: {
            example: {
              message: '',
              error: RESPONSE_MESSAGES.COMMON.BAD_REQUEST,
              statusCode: HttpStatus.BAD_REQUEST,
            },
          },
        },
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: 'Error Response',
          schema: {
            example: {
              message: '',
              error: 'Internal Server Error',
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
          },
        },
      )
      .addApiKey(
        {
          type: 'apiKey',
          name: 'x-api-key',
          in: 'header',
        },
        'api-key',
      )
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [],
    });
    app.use('/api-docs', swaggerAuth);


    SwaggerModule.setup('api-docs', app, swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    const hostAddress = Object.values(os.networkInterfaces())
      .flat()
      .filter((item): item is os.NetworkInterfaceInfo => item !== undefined)
      .filter(({ family, internal }) => family === 'IPv4' && !internal)
      .map(({ address }) => address);

    const port = configService.get<number>('PORT', 3000);
    await app.listen(port);

    Logger.log(
      Color.green(
        `
  ===================================================================
       Server started successfully and running on port ${hostAddress[0]}:${port}
  ===================================================================  
    `,
      ).bold,
    );
  } catch (error: any) {
    Logger.error('Failed to start server', error?.message);
    process.exit(1);
  }
}


void bootstrap()
