import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Order');

  const subscriptionPort = process.env.PAYMENT_SERVICE_SUBSCRIPTION_PORT;

  logger.log('Subscription port: ' + subscriptionPort);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4040,
    },
  });
  app.listen(() => console.log('Microservice is listening in Payment service'));
  logger.log('Order service created successful');
}
bootstrap();
