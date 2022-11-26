import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsuarioDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    const users = await this.prisma.usuario.findMany();
    return users;
  }
  async obteneruno(ci: string) {
    const u = await this.prisma.usuario.findUnique({
      where: {
        ci: ci,
      },
    });
    return u;
  }
  async registrar(dto: UsuarioDto) {
    const user = await this.prisma.usuario.create({
      data: {
        ci: dto.ci,
        rol: {
          connect: {
            id: dto.id_rol,
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
    return user;
  }
  async actualizar(ci: string, dto: Prisma.usuarioUpdateInput) {
    const us = await this.prisma.usuario.update({
      where: {
        ci: ci,
      },
      data: {
        ci: dto.ci,
        rol: {
          connect: {
            id: dto.rol.connect.id,
          },
        },
        usuario: dto.usuario,
        contrasena: dto.contrasena,
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        fecha_nacimiento: dto.fecha_nacimiento,
        telefono: dto.telefono,
        sexo: dto.sexo,
      },
    });
    return us;
  }
  async eliminar(ci: string) {
    const u = await this.prisma.usuario.update({
      where: {
        ci: ci,
      },
      data: {
        estado: false,
      },
    });
    return u;
  }
}
