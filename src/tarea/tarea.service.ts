import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TareaService {
  constructor(private prisma: PrismaService) {}

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
  async registrar(dto: Prisma.tareaCreateInput) {
    try {
      const t = await this.prisma.tarea.create({
        data: {
          pedido: {
            connect: {
              id: dto.pedido.connect.id,
            },
          },
          usuario: {
            connect: {
              ci: dto.usuario.connect.ci,
            },
          },
          conductor: {
            connect: {
              ci: dto.conductor.connect.ci,
            },
          },
        },
      });
      return t;
    } catch (error) {
      return error;
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
              ci: dto.conductor.connect.ci,
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
