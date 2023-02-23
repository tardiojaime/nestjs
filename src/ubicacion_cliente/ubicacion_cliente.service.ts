import { Injectable } from '@nestjs/common';
import { UbicacionCliente } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UbicacionClienteService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    const ubicaciones = await this.prisma.cliente.findMany();
    return ubicaciones;
  }
  async obteneruno(id: number) {
    const ubicacion = await this.prisma.cliente.findUnique({
      where: {
        id: id,
      },
    });
    return ubicacion;
  }
  async registrar(dto: UbicacionCliente) {
    const ubicacion = await this.prisma.cliente.create({
      data: {
        id_usuario: dto.id_cliente,
        calle_numero: dto.calle_numero,
        latitud: dto.latitud,
        longitud: dto.longitud,
      },
    });
    return ubicacion;
  }
  async actualizar(id: number, dto: UbicacionCliente) {
    try {
      const ubicacion = await this.prisma.cliente.update({
        where: {
          id: id,
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
  async eliminar(id: number) {
    const ubicacion = await this.prisma.cliente.delete({
      where: {
        id: id,
      },
    });
    return ubicacion;
  }
}
