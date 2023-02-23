import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from '../dto';
@Injectable()
export class JwtStrategia extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: 100,
      secretOrKey: env.JWT_SECRET,
    });
  }
  // payload carga util
  async validate(payload: AuthDto) {
    const u = await this.prisma.usuario.findFirst({
      where: {
        usuario: payload.usuario,
      },
      select: {
        ci: true,
        email: true,
        rol: {
          select: {
            nombre: true,
          },
        },
      },
    });
    if (!u) throw new UnauthorizedException();
    return u;
  }
}
