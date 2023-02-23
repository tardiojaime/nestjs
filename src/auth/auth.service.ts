import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }
  async signin(dto: AuthDto): Promise<any> {
    const u = await this.prisma.usuario.findFirst({
      where: {
        usuario: dto.usuario,
      },
      select: {
        usuario: true,
        ci: true,
        email: true,
        contrasena: true,
        rol: {
          select: {
            nombre: true,
          },
        },
      },
    });
    const client = this.prisma.cliente.findFirst({
      where: {
        id_usuario: u.ci,
      },
      select: {
        id: true,
      },
    });
    const verificacion = await compare(dto.contrasena, u.contrasena);

    if (u && verificacion) {
      if (u.rol.nombre === 'Cliente') {
        return {
          usuario: u.usuario,
          ci: u.ci,
          rol: u.rol.nombre,
          id: (await client).id,
          token: this.jwtService.sign({
            ci: u.ci,
            email: u.email,
            rol: u.rol.nombre,
          }),
        };
      } else {
        return {
          usuario: u.usuario,
          ci: u.ci,
          rol: u.rol.nombre,
          token: this.jwtService.sign({
            ci: u.ci,
            email: u.email,
            rol: u.rol.nombre,
          }),
        };
      }
    }
    return { error: 'error' };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      username: payload.username,
      access_token: this.jwtService.sign(payload),
    };
  }
  logout() { }
}
