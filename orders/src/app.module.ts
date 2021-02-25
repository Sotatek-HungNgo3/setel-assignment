import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { OrderModule } from './orders/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddAuthUserMiddleware } from './common/middleware/add-auth-user.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log(process.env.MONGO_DSN);
        return {
          uri: process.env.MONGO_DSN,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
    }),
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddAuthUserMiddleware)
      .forRoutes('api/orders', '/api/me', '/api/logout')
      .apply(AuthMiddleware)
      .forRoutes('api/orders', 'api/me', 'api/logout');
  }
}
