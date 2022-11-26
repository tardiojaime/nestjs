import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolService {
  constructor(private prisma: PrismaService) {}

  async obtener() {
    const rols = await this.prisma.rol.findMany();
    return rols;
  }
  async obteneruno(id: number) {
    const rols = await this.prisma.rol.findUnique({
      where: {
        id: id,
      },
    });
    return rols;
  }
  async registrar(dto: Prisma.rolCreateInput) {
    const newrol = await this.prisma.rol.create({
      data: {
        nombre: dto.nombre,
      },
    });
    return newrol;
  }
  async actualizar(ids, dto: Prisma.rolUpdateInput) {
    const updaterol = await this.prisma.rol.update({
      where: {
        id: ids,
      },
      data: {
        nombre: dto.nombre,
      },
    });
    return updaterol;
  }
  async debaja(dto: Prisma.rolUncheckedCreateInput) {
    const baja = await this.prisma.rol.update({
      where: {
        id: dto.id,
      },
      data: {
        estado: dto.estado,
      },
    });
    return baja;
  }
}
