import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signin(dto: AuthDto): Promise<any> {
    const u = await this.prisma.usuario.findFirst({
      where: {
        usuario: dto.usuario,
      },
      select: {
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
    const verificacion = await compare(dto.contrasena, u.contrasena);
    console.log(verificacion);
    if (u && verificacion) {
      return {
        token: this.jwtService.sign({
          ci: u.ci,
          email: u.email,
          rol: u.rol.nombre,
        }),
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  signup() {}
  logout() {}
}
