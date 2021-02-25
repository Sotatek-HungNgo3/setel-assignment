import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Order');

  const mainPort = process.env.ORDER_SERVICE_PORT;
  const subscriptionPort = process.env.ORDER_SERVICE_SUBSCRIPTION_PORT;

  logger.log('Main port: ' + mainPort);
  logger.log('Subscription port: ' + subscriptionPort);

  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.ORDER_SERVICE_SUBSCRIPTION_PORT,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.ORDER_SERVICE_PORT);

  logger.log('Order service created successful');
  // await app.listen(3000);
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: 4040,
  //   },
  // });
  // app.listen(() => console.log('Microservice is listening in Order Service'));
}
bootstrap();
