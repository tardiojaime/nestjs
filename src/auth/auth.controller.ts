import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  //registarse
  @Post('/signin')
  signin(@Body() dto: AuthDto) {
    return this.authservice.signin(dto);
  }
  // incribirse
  @Post('/logaut')
  logaut() {
    this.authservice.logout();
  }
}
