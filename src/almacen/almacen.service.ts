import { Injectable } from '@nestjs/common';
import { AlmacenDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlmacenService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const almacen = await this.prisma.almacen.findMany();
      return almacen;
    } catch (error) {
      return error;
    }
  }
  async obteneruno(id: number) {
    try {
      const almacen = this.prisma.almacen.findUnique({
        where: {
          id: id,
        },
      });
      return almacen;
    } catch (error) {
      return error;
    }
  }
  async registrar(dto: AlmacenDto) {
    try {
      const almacen = await this.prisma.almacen.create({
        data: {
          almacen: dto.almacen,
          latitud: dto.latitud,
          longitud: dto.longitud,
          capacidad: dto.capacidad,
        },
      });
      return almacen;
    } catch (error) {
      return error;
    }
  }
  async actualizar(id: number, dto: AlmacenDto) {
    try {
      const almacen = await this.prisma.almacen.update({
        where: {
          id: id,
        },
        data: {
          almacen: dto.almacen,
          latitud: dto.latitud,
          longitud: dto.longitud,
          capacidad: dto.capacidad,
        },
      });
      return almacen;
    } catch (error) {
      return error;
    }
  }
}
