import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const p = await this.prisma.producto.findMany();
      console.log(typeof p);
      return p;
    } catch (error) {
      return error;
    }
  }
  async obteneruno(id: number) {
    try {
      const p = await this.prisma.producto.findUnique({
        where: {
          id: id,
        },
      });
      return p;
    } catch (error) {
      return error;
    }
  }
  async registrar(dto: Prisma.productoCreateInput) {
    try {
      const name = await this.prisma.producto.findMany({
        where: {
          nombre: dto.nombre,
        },
      });
      if (!name) {
        const a = await this.prisma.producto.findFirst();
        if (a) {
          const p = await this.prisma.producto.create({
            data: {
              almacen: {
                connect: {
                  id: a.id,
                },
              },
              categoria: {
                connect: {
                  id: dto.categoria.connect.id,
                },
              },
              nombre: dto.nombre,
              precio: dto.precio,
              marca: dto.marca,
              stock: dto.stock,
            },
          });
          return p;
        }
      }
      return { ms: 'error en el registro del producto' };
    } catch (error) {
      return error;
    }
  }
  async actualizar(idp: number, dto: Prisma.productoUpdateInput) {
    try {
      const pu = await this.prisma.producto.update({
        where: {
          id: idp,
        },
        data: {
          nombre: dto.nombre,
          categoria: {
            connect: {
              id: dto.categoria.connect.id,
            },
          },
          marca: dto.marca,
        },
      });
      return pu;
    } catch (error) {
      return error;
    }
  }
}