import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProveedorService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const p = await this.prisma.proveedor.findMany();
      return p;
    } catch (error) {
      return error;
    }
  }
  async obteneruno(ci: string) {
    try {
      const p = await this.prisma.proveedor.findUnique({
        where: {
          ci: ci,
        },
      });
      return p;
    } catch (error) {
      return error;
    }
  }
  async registrar(dto: Prisma.proveedorCreateInput) {
    const edad = parseInt(dto.edad + '');
    try {
      const p = await this.prisma.proveedor.create({
        data: {
          ci: dto.ci,
          nombre: dto.nombre,
          apellido: dto.apellido,
          email: dto.email,
          telefono: dto.telefono,
          sexo: dto.sexo,
          edad: edad,
        },
      });
      return p;
    } catch (error) {
      return error;
    }
  }
  async actualizar(ci: string, dto: Prisma.proveedorUpdateInput) {
    const edad = parseInt(dto.edad + '');
    try {
      const p = await this.prisma.proveedor.update({
        where: {
          ci: ci,
        },
        data: {
          ci: dto.ci,
          nombre: dto.nombre,
          apellido: dto.apellido,
          email: dto.email,
          telefono: dto.telefono,
          sexo: dto.sexo,
          edad: edad,
        },
      });
      return p;
    } catch (error) {
      return error;
    }
  }
  async debaja(ci: string) {
    try {
      const p = await this.prisma.proveedor.update({
        where: {
          ci: ci,
        },
        data: {
          estado: false,
        },
      });
      return p;
    } catch (error) {
      return error;
    }
  }
}
