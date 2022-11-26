import { Injectable } from '@nestjs/common';
import { UbicacionCliente } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UbicacionClienteService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    const ubicaciones = await this.prisma.ubicacion_cliente.findMany();
    return ubicaciones;
  }
  async obteneruno(id: string) {
    const ubicacion = await this.prisma.ubicacion_cliente.findUnique({
      where: {
        id_cliente: id,
      },
    });
    return ubicacion;
  }
  async registrar(dto: UbicacionCliente) {
    const ubicacion = await this.prisma.ubicacion_cliente.create({
      data: {
        id_cliente: dto.id_cliente,
        calle_numero: dto.calle_numero,
        latitud: dto.latitud,
        longitud: dto.longitud,
      },
    });
    return ubicacion;
  }
  async actualizar(ci: string, dto: UbicacionCliente) {
    try {
      const ubicacion = await this.prisma.ubicacion_cliente.update({
        where: {
          id_cliente: ci,
        },
        data: {
          calle_numero: dto.calle_numero,
          latitud: dto.latitud,
          longitud: dto.longitud,
        },
      });
      return ubicacion;
    } catch (error) {
      return error;
    }
  }
  async eliminar(id: string) {
    const ubicacion = await this.prisma.ubicacion_cliente.delete({
      where: {
        id_cliente: id,
      },
    });
    return ubicacion;
  }
}
