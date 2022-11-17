import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  obtenerUsuarios() {
    const users = this.prisma.usuario.findMany();
    return users;
  }
  signin(dto: AuthDto) {
    const email = dto.usuario;
    const password = dto.contrasena;
    return { usuario: email, contrasena: password, send: 'ok' };
  }
  signup() {}
  logout() {}
  actualizartoken() {}
}
