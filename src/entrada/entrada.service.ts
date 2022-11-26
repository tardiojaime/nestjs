import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DtoEntrada, DtoPedido } from 'src/dto/dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class EntradaService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const e = await this.prisma.entrada_producto.findMany();
      return e;
    } catch (error) {
      return error;
    }
  }
  async alldetails(id: number) {
    //console.log(typeof id);
    const details = await this.prisma.entrada_producto.findUnique({
      where: {
        id: id,
      },
      include: {
        detalle_entrada: true,
      },
    });
    return details;
  }
  async obteneruno(id: number) {
    try {
      const [entrada, detalle] = await this.prisma.$transaction([
        this.prisma.entrada_producto.findUnique({
          where: {
            id: id,
          },
        }),
        this.prisma.detalle_entrada.findMany({
          where: {
            id_entrada: id,
          },
        }),
      ]);
      return [entrada, detalle];
    } catch (error) {
      return error;
    }
  }
  async registrar(dto: DtoEntrada) {
    const entr = await this.prisma.entrada_producto.create({
      data: {
        usuario: {
          connect: {
            ci: dto.id_usuario,
          },
        },
        proveedor: {
          connect: {
            ci: dto.id_proveedor,
          },
        },
        almacen: {
          connect: {
            id: dto.id_almacen,
          },
        },
        total: dto.total,
      },
    });
    const detalless = [];
    for (let num = 0; num < dto.id_producto.length; num++) {
      const detalles = await this.prisma.detalle_entrada.create({
        data: {
          producto: {
            connect: {
              id: dto.id_producto[num],
            },
          },
          entrada_producto: {
            connect: {
              id: (await entr).id,
            },
          },
          cantidad: dto.cantidad[num],
          precio: dto.precio[num],
        },
      });
      detalless.push(detalles);
    }
    return detalless;
  }
  async actualizar(id: number, dto: Prisma.detalle_entradaUpdateInput) {
    try {
      const d = await this.prisma.detalle_entrada.update({
        where: {
          id: id,
        },
        data: {
          producto: {
            connect: {
              id: dto.producto.connect.id,
            },
          },
          cantidad: dto.cantidad,
        },
      });
      return d;
    } catch (error) {
      return error;
    }
  }
  async quitar(id: number) {
    try {
      const d = await this.prisma.detalle_entrada.delete({
        where: {
          id: id,
        },
      });
      return d;
    } catch (error) {
      return error;
    }
  }
}
