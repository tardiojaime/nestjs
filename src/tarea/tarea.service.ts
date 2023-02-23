import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TareaService {
  constructor(private prisma: PrismaService) { }
  async obtenerConductores() {
    const c = this.prisma
      .$queryRaw`SELECT c.id, u.nombre, u.apellido  from usuario u INNER JOIN conductor c ON c.id_usuario=u.ci`;
    return c;
  }
  async obtener() {
    try {
      const t = await this.prisma.tarea.findMany({
        orderBy: {
          id: 'desc',
        },
      });
      return t;
    } catch (error) {
      return error;
    }
  }
  async obtenerporestados(id: boolean) {
    try {
      const t = await this.prisma.tarea.findMany({
        where: {
          estado: id,
        },
        orderBy: {
          id: 'asc',
        },
      });
      return t;
    } catch (error) {
      return error;
    }
  }
  async obteneruno(id: number) {
    try {
      const t = await this.prisma.tarea.findUnique({
        where: {
          id: id,
        },
      });
      return t;
    } catch (error) {
      return error;
    }
  }
  async registrar(dto) {
    try {
      const t = await this.prisma.tarea.create({
        data: {
          pedido: {
            connect: {
              id: dto.p_id,
            },
          },
          usuario: {
            connect: {
              ci: dto.u_ci,
            },
          },
          conductor: {
            connect: {
              id: dto.c_id,
            },
          },
        },
      });
      return t;
    } catch (error) {
      return { error: 'errror' };
    }
  }
  async actualizar(id: number, dto: Prisma.tareaUpdateInput) {
    try {
      const t = await this.prisma.tarea.update({
        where: {
          id: id,
        },
        data: {
          usuario: {
            connect: {
              ci: dto.usuario.connect.ci,
            },
          },
          conductor: {
            connect: {
              id: dto.conductor.connect.id,
            },
          },
        },
      });
      return t;
    } catch (error) {
      return error;
    }
  }
}
