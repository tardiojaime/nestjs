import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioDto } from 'src/auth/dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userservice: UsersService) {}
  @Get()
  getusers() {
    return this.userservice.obtener();
  }
  @Post()
  registrar(@Body() dto: UsuarioDto) {
    return this.userservice.registrar(dto);
  }
}
