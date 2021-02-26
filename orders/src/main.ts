import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import configuration from './config/configuration';

const logger = new Logger('Order');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configuration().port,
    },
  } as TcpOptions);
  await app.listenAsync();
  logger.log('Listening');
}
bootstrap();
