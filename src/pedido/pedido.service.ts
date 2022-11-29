import { Injectable } from '@nestjs/common';
import { DtoPedido } from 'src/dto/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoDetalle } from './actualizar.dto';
@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const pedidos = await this.prisma.pedido.findMany();
      return pedidos;
    } catch (error) {
      return error;
    }
  }
  async alldetails(id: number) {
    console.log(typeof id);
    const details = await this.prisma.pedido.findUnique({
      where: {
        id: id,
      },
      include: {
        detalle_pedido: true,
      },
    });
    return details;
  }
  async obteneruno(id: number) {
    try {
      const [pedido, detalle] = await this.prisma.$transaction([
        this.prisma.pedido.findUnique({
          where: {
            id: id,
          },
        }),
        this.prisma.detalle_pedido.findMany({
          where: {
            id_pedido: id,
          },
        }),
      ]);
      return [pedido, detalle];
    } catch (error) {
      return error;
    }
  }
  async regispedidos(dto: DtoPedido) {
    const ped = await this.prisma.pedido.create({
      data: {
        usuario: {
          connect: {
            ci: dto.id_cliente,
          },
        },
        fecha_entrega: dto.fechaentrega,
        total: dto.total,
      },
    });
    const detalless = [];
    for (let num = 0; num < dto.id_producto.length; num++) {
      const detalles = await this.prisma.detalle_pedido.create({
        data: {
          pedido: {
            connect: {
              id: (await ped).id,
            },
          },
          producto: {
            connect: {
              id: dto.id_producto[num],
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
  async actualizar(id: number, dto: DtoDetalle) {
    const dp = await this.prisma.detalle_pedido.update({
      where: {
        id: id,
      },
      data: {
        id_producto: dto.id,
        cantidad: dto.cantidad,
      },
    });
    return dp;
  }
  async quitar(id: number) {
    try {
      const dp = await this.prisma.detalle_pedido.delete({
        where: {
          id: id,
        },
      });
      return dp;
    } catch (error) {
      return error;
    }
  }
}
