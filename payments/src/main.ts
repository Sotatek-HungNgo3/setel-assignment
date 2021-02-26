import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const logger = new Logger('Payment');

  const subscriptionPort = process.env.PAYMENT_SERVICE_SUBSCRIPTION_PORT;

  logger.log('Subscription port: ' + subscriptionPort);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configuration().port,
    },
  });
  app.listen(() => console.log('Microservice is listening in Payment service'));
  logger.log('Payment service created successful');
}
bootstrap();
