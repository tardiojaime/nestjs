import { Injectable } from '@nestjs/common';
import { UsuarioDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    const users = await this.prisma.usuario.findMany();
    return users;
  }
  async registrar(dto: UsuarioDto) {
/*     const user = await this.prisma.usuario.create({
      data: {
        ci: dto.ci,
        rol: {
            connect: {
                id_rol: dto.id_rol,
            },
        },
        usuario: dto.usuario,
        contrasena: dto.constrasena,
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        fecha_nacimiento: dto.fecha_nacimiento,
        telefono: dto.telefono,
        sexo: dto.sexo,
      },
    });
    return user; */
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  actualizar() {}
  eliminar() {}
}
