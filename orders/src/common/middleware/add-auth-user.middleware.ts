import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { defaultUser } from '../constants/default-user';

@Injectable()
export class AddAuthUserMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    req.user = defaultUser;

    return next();
  }
}
