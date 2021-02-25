import { Controller, Get, Post } from '@nestjs/common';
import { defaultUser } from '../common/constants/default-user';

@Controller('api/auth')
export class AuthController {
  @Post('/login')
  login() {
    return defaultUser;
  }

  @Post('/logout')
  logout() {
    return null;
  }

  @Get('/me')
  getMe() {
    return defaultUser;
  }
}
