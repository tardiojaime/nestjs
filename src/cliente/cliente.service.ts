import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { Cliente } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) { }
  async obtener() {
    try {
      const cliente = await this.prisma.usuario.findMany({
        where: {
          rol: {
            nombre: 'cliente',
          },
        },
        include: {
          cliente: {
            select: {
              calle_numero: true,
              longitud: true,
              latitud: true,
            },
          },
        },
      });
      return cliente;
    } catch (error) {
      return error;
    }
  }
  async obtenerUnoQ(ci: string) {
    const clientes = await this.prisma
      .$queryRaw`SELECT u.ci,u.usuario, u.nombre, u.contrasena, u.apellido, u.email, u.fecha_nacimiento, u.telefono, u.sexo, c.calle_numero, c.latitud, c.longitud FROM usuario u INNER JOIN cliente c ON c.id_usuario = u.ci WHERE u.ci = ${ci}`;
    return clientes;
  }
  async obteneruno(ci: string) {
    try {
      const cliente = await this.prisma.usuario.findUnique({
        where: {
          ci: ci,
        },
        include: {
          //rol: true,
          cliente: true,
        },
      });
      return cliente;
    } catch (error) {
      return error;
    }
  }
  async query() {
    const clientes = await this.prisma.$queryRaw`SELECT * FROM list_cliente`;
    return clientes;
  }
  async registrar(dto: Cliente) {
    const haspas = await hash(dto.contrasena, 10);
    try {
      const [usuario, cliente] = await this.prisma.$transaction([
        this.prisma.usuario.create({
          data: {
            ci: dto.ci,
            rol: {
              connect: {
                id: 4,
              },
            },
            usuario: dto.usuario,
            contrasena: haspas,
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            fecha_nacimiento: dto.fechanacimiento,
            telefono: dto.telefono,
            sexo: dto.sexo,
          },
        }),
        this.prisma.cliente.create({
          data: {
            id_usuario: dto.ci,
            calle_numero: dto.calle_numero,
            latitud: dto.latitud,
            longitud: dto.longitud,
          },
        }),
      ]);
      return [usuario, cliente];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async actualizar(ci, dto: Cliente) {
    dto.contrasena = await hash(dto.contrasena, 10);

    if (dto.contrasena.length < 15) {
      const [cliente, ubicacion] = await this.prisma.$transaction([
        this.prisma.usuario.update({
          where: {
            ci: ci,
          },
          data: {
            usuario: dto.usuario,
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            fecha_nacimiento: dto.fechanacimiento,
            telefono: dto.telefono,
            sexo: dto.sexo,
          },
        }),
        this.prisma
          .$queryRaw`UPDATE cliente SET calle_numero= ${dto.calle_numero}, latitud=${dto.latitud}, longitud=${dto.longitud} WHERE id_usuario=${ci}`,
      ]);
      return [cliente, ubicacion];
    } else {
      const [cliente, ubicacion] = await this.prisma.$transaction([
        this.prisma.usuario.update({
          where: {
            ci: ci,
          },
          data: {
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
        this.prisma
          .$queryRaw`UPDATE cliente SET calle_numero= ${dto.calle_numero}, latitud=${dto.latitud}, longitud=${dto.longitud} WHERE id_usuario=${ci}`,
      ]);
      return [cliente, ubicacion];
    }
  }
  async eliminar(ci: string) {
    const idc = this.prisma.cliente.findFirst({
      where: {
        id_usuario: ci,
      },
      select: {
        id: true,
      },
    });
    try {
      const cliente = await this.prisma.$transaction([
        this.prisma.cliente.delete({
          where: {
            id: (await idc).id,
          },
        }),
        this.prisma.usuario.delete({
          where: {
            ci: ci,
          },
        }),
      ]);
      return cliente;
    } catch (error) {
      return error;
    }
  }
}
