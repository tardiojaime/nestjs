import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: AuthDto) {
    return this.authservice.signin(dto);
  }
  @Post('/signup')
  singup() {
    this.authservice.signup();
  }
  @Post('/logaut')
  logaut() {
    this.authservice.logout();
  }
}
