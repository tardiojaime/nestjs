import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovilService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    const m = await this.prisma.movil.findMany();
    return m;
  }
  async obteneruno(id: number) {
    const m = await this.prisma.movil.findUnique({
      where: {
        id: id,
      },
    });
    return m;
  }
  async registrar(dto: Prisma.movilCreateInput) {
    const m = await this.prisma.movil.create({
      data: {
        modelo: dto.modelo,
        numero: dto.numero,
        marca: dto.marca,
        color: dto.color,
      },
    });
    return m;
  }
  async actualizar(id: number, dto: Prisma.movilUpdateInput) {
    const m = await this.prisma.movil.update({
      where: {
        id: id,
      },
      data: {
        modelo: dto.modelo,
        numero: dto.numero,
        marca: dto.marca,
        color: dto.color,
      },
    });
    return m;
  }
  async debaja(id: number) {
    const m = await this.prisma.movil.update({
      where: {
        id: id,
      },
      data: {
        estado: false,
      },
    });
    return m;
  }
}
