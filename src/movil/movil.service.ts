import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class telefonoService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    const m = await this.prisma.telefono.findMany({
      where: {
        estado: true,
      },
    });
    return m;
  }
  async obteneruno(id: number) {
    const m = await this.prisma.telefono.findUnique({
      where: {
        id: id,
      },
    });
    return m;
  }
  async registrar(dto: Prisma.telefonoCreateInput) {
    const m = await this.prisma.telefono.create({
      data: {
        modelo: dto.modelo,
        numero: dto.numero,
        marca: dto.marca,
        color: dto.color,
      },
    });
    return m;
  }
  async actualizar(id: number, dto: Prisma.telefonoUpdateInput) {
    const m = await this.prisma.telefono.update({
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
    const m = await this.prisma.telefono.update({
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
