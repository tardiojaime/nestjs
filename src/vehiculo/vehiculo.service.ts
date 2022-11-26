import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehiculoService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    const y = await this.prisma.movilidad.findMany();
    return y;
  }
  async obteneruno(placa: string) {
    const m = await this.prisma.movilidad.findUnique({
      where: {
        num_placa: placa,
      },
    });
    return m;
  }
  async registrar(dto: Prisma.movilidadCreateInput) {
    try {
      const m = await this.prisma.movilidad.create({
        data: {
          num_placa: dto.num_placa,
          modelo: dto.modelo,
          marca: dto.marca,
          color: dto.color,
          tipo_movilidad: dto.tipo_movilidad,
        },
      });
    } catch (error) {
      return error;
    }
  }
  async actulizar(placa: string, dto: Prisma.movilidadUpdateInput) {
    const m = await this.prisma.movilidad.update({
      where: {
        num_placa: placa,
      },
      data: {
        modelo: dto.modelo,
        marca: dto.marca,
        color: dto.color,
        tipo_movilidad: dto.tipo_movilidad,
      },
    });
    return m;
  }
  async debaja(placa: string) {
    const m = await this.prisma.movilidad.update({
      where: {
        num_placa: placa,
      },
      data: {
        estado: false,
      },
    });
    return m;
  }
}
