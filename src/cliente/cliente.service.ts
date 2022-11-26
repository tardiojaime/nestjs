import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const cliente = await this.prisma.usuario.findMany({
        where: {
          rol: {
            nombre: 'cliente',
          },
        },
        include: {
          rol: true,
          ubicacion_cliente: true,
        },
      });
      return cliente;
    } catch (error) {
      return error;
    }
  }
  async obteneruno(ci: string) {
    try {
      const cliente = await this.prisma.usuario.findUnique({
        where: {
          ci: ci,
        },
        include: {
          rol: true,
          ubicacion_cliente: true,
        },
      });
      return cliente;
    } catch (error) {
      return error;
    }
  }
  async query() {
    const [users, num] = await this.prisma.$transaction([
      this.prisma
        .$queryRaw`SELECT * FROM usuario u INNER JOIN rol r on u.id_rol=r.id INNER JOIN ubicacion_cliente c on c.id_cliente=u.ci where r.nombre='cliente'`,
      this.prisma.$queryRaw`SELECT u.nombre from usuario u`,
    ]);
    return [users, num];
  }
  async registrar(dto: Cliente) {
    try {
      const [cliente, ubicacion] = await this.prisma.$transaction([
        this.prisma.usuario.create({
          data: {
            ci: dto.ci,
            rol: {
              connect: {
                id: dto.rol,
              },
            },
            usuario: dto.usuario,
            contrasena: dto.contrasena,
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            fecha_nacimiento: dto.fechanacimiento,
            telefono: dto.telefono,
            sexo: dto.sexo,
          },
        }),
        this.prisma.ubicacion_cliente.create({
          data: {
            id_cliente: dto.ci,
            calle_numero: dto.calle_numero,
            latitud: dto.latitud,
            longitud: dto.longitud,
          },
        }),
      ]);
      return [cliente, ubicacion];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async actualizar(dto: Cliente) {
    try {
      const [cliente, ubicacion] = await this.prisma.$transaction([
        this.prisma.usuario.update({
          where: {
            ci: dto.ci,
          },
          data: {
            ci: dto.ci,
            rol: {
              connect: {
                id: dto.rol,
              },
            },
            usuario: dto.usuario,
            contrasena: dto.contrasena,
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            fecha_nacimiento: dto.fechanacimiento,
            telefono: dto.telefono,
            sexo: dto.sexo,
          },
        }),
        this.prisma.ubicacion_cliente.update({
          where: {
            id_cliente: dto.ci,
          },
          data: {
            id_cliente: dto.ci,
            calle_numero: dto.calle_numero,
            latitud: dto.latitud,
            longitud: dto.longitud,
          },
        }),
      ]);
      return [cliente, ubicacion];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async eliminar(id: string) {
    try {
      const cliente = await this.prisma.$transaction([
        this.prisma.ubicacion_cliente.delete({
          where: {
            id_cliente: id,
          },
        }),
        this.prisma.usuario.delete({
          where: {
            ci: id,
          },
        }),
      ]);
      return cliente;
    } catch (error) {
      return error;
    }
  }
}
