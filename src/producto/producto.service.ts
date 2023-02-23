import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) { }
  async obtener() {
    try {
      const p = await this.prisma.producto.findMany();
      console.log(typeof p);
      return p;
    } catch (error) {
      return error;
    }
  }
  async obtenerinformacion(categoria: string) {
    if (categoria !== 'All') {
      const producto = await this.prisma
        .$queryRaw`SELECT p.id, p.nombre, p.precio, p.stock, p.marca, p.imagenes from producto p INNER JOIN categoria c on c.id = p.id_categoria WHERE c.categoria = ${categoria}`;
      return producto;
    } else {
      const p = await this.prisma.producto.findMany();
      return p;
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
  async registrarImg(img, dto: Prisma.productoCreateInput) {
    return { ms: 'error en el registro del producto' };
  }
  async registrarImgs(imagenes, dto: Prisma.productoCreateInput) {
    dto.stock = parseInt(dto.stock + '');
    const catr = parseInt(dto.categoria + '');
    imagenes = imagenes as Prisma.JsonArray;
    const name = await this.prisma.producto.findMany({
      where: {
        nombre: dto.nombre,
      },
    });
    if (name.length == 0) {
      const a = await this.prisma.almacen.findFirst();
      if (a.id) {
        console.log(a);
        const p = await this.prisma.producto.create({
          data: {
            almacen: {
              connect: {
                id: a.id,
              },
            },
            categoria: {
              connect: {
                id: catr,
              },
            },
            imagenes: imagenes[0].img,
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
              id: 2,
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
