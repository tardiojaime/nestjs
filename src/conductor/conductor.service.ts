import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Conductor } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConductorService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const c = await this.prisma.usuario.findMany({
        where: {
          rol: {
            nombre: 'conductor',
          },
        },
        include: {
          rol: true,
          conductor: true,
        },
      });
      return c;
    } catch (error) {
      return error;
    }
  }
  async obteneruno(ci: string) {
    try {
      const c = await this.prisma.usuario.findUnique({
        where: {
          ci: ci,
        },
        include: {
          rol: true,
          conductor: true,
        },
      });
      return c;
    } catch (error) {
      return error;
    }
  }
  async registrar(dto: Conductor) {
    dto.contrasena = await hash(dto.contrasena, 10);
    try {
      const [Usuario, conductor] = await this.prisma.$transaction([
        this.prisma.usuario.create({
          data: {
            ci: dto.ci,
            rol: {
              connect: {
                id: dto.rol,
              },
            },
            usuario: dto.usuario,
            contrasena: dto.contrasena,
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            fecha_nacimiento: dto.fechanacimiento,
            telefono: dto.telefono,
            sexo: dto.sexo,
          },
        }),
        this.prisma.conductor.create({
          data: {
            usuario: {
              connect: {
                ci: dto.ci,
              },
            },
            movil: {
              connect: {
                id: dto.id_movil,
              },
            },
            movilidad: {
              connect: {
                num_placa: dto.id_movilidad,
              },
            },
            anos_experiencia: dto.anos_experiencia,
            tipo_licencia: dto.tipo_licencia,
          },
        }),
      ]);
      return [Usuario, conductor];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async actualizar(dto: Conductor) {
    try {
      dto.contrasena = await hash(dto.contrasena, 10);
      const [usuario, conductor] = await this.prisma.$transaction([
        this.prisma.usuario.update({
          where: {
            ci: dto.ci,
          },
          data: {
            ci: dto.ci,
            rol: {
              connect: {
                id: dto.rol,
              },
            },
            usuario: dto.usuario,
            contrasena: dto.contrasena,
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            fecha_nacimiento: dto.fechanacimiento,
            telefono: dto.telefono,
            sexo: dto.sexo,
          },
        }),
        this.prisma.conductor.update({
          where: {
            ci: dto.ci,
          },
          data: {
            id_movil: dto.id_movil,
            id_movilidad: dto.id_movilidad,
            anos_experiencia: dto.anos_experiencia,
            tipo_licencia: dto.tipo_licencia,
          },
        }),
      ]);
      return [usuario, conductor];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async eliminar(id: string) {
    try {
      const cliente = await this.prisma.$transaction([
        this.prisma.conductor.delete({
          where: {
            ci: id,
          },
        }),
        this.prisma.usuario.delete({
          where: {
            ci: id,
          },
        }),
      ]);
      return cliente;
    } catch (error) {
      return error;
    }
  }
}
