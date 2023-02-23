import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Conductor } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConductorService {
  constructor(private prisma: PrismaService) { }
  async telefono() {
    return this.prisma.telefono.findMany();
    //SELECT * FROM telefono t WHERE t.id != (SELECT t.id from telefono t INNER JOIN conductor c on c.id_telefono= t.id);
  }
  async Vehiculo() {
    return this.prisma.movilidad.findMany();
  }

  async obtenerQ() {
    try {
      const conduc = await this.prisma
        .$queryRaw`SELECT u.ci, u.usuario, u.nombre, u.apellido, u.email, u.fecha_nacimiento, u.telefono, u.sexo, c.anos_experiencia, c.tipo_licencia, t.modelo, t.marca as 'marcat', m.marca, m.modelo as 'modeloV' from  usuario u INNER JOIN conductor c on c.id_usuario= u.ci INNER JOIN movilidad m ON m.num_placa=c.id_movilidad INNER JOIN telefono t on t.id = c.id_telefono where u.estado=true`;
      return conduc;
    } catch (error) {
      return { error: 'error' };
    }
  }
  async obtenerUno(ci: string) {
    try {
      const conduc = await this.prisma
        .$queryRaw`SELECT u.ci, u.usuario,u.contrasena, u.nombre, u.apellido, u.email, u.fecha_nacimiento, u.telefono, u.sexo, c.anos_experiencia, c.id_telefono, c.id_movilidad, c.anos_experiencia, c.tipo_licencia, c.id from  usuario u INNER JOIN conductor c on c.id_usuario= u.ci INNER JOIN movilidad m ON m.num_placa=c.id_movilidad INNER JOIN telefono t on t.id = c.id_telefono WHERE u.ci=${ci}`;
      return conduc[0];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async obtener() {
    try {
      const c = await this.prisma.usuario.findMany({
        where: {
          rol: {
            nombre: 'conductor',
          },
        },
        include: {
          rol: true,
          conductor: true,
        },
      });
      return c;
    } catch (error) {
      return error;
    }
  }
  async obteneruno(ci: string) {
    try {
      const c = await this.prisma.usuario.findUnique({
        where: {
          ci: ci,
        },
        include: {
          conductor: true,
        },
      });
      return c;
    } catch (error) {
      return error;
    }
  }
  async registrar(dto: Conductor) {
    dto.contrasena = await hash(dto.contrasena, 10);
    try {
      const [Usuario, conductor] = await this.prisma.$transaction([
        this.prisma.usuario.create({
          data: {
            ci: dto.ci,
            rol: {
              connect: {
                id: 3,
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
        this.prisma.conductor.create({
          data: {
            usuario: {
              connect: {
                ci: dto.ci,
              },
            },
            telefono: {
              connect: {
                id: parseInt(dto.id_movil),
              },
            },
            movilidad: {
              connect: {
                num_placa: dto.id_movilidad,
              },
            },
            anos_experiencia: parseInt(dto.anos_experiencia),
            tipo_licencia: dto.tipo_licencia,
          },
        }),
      ]);
      return [Usuario, conductor];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async actualizar(ci: string, dto: Conductor) {
    try {
      dto.contrasena = await hash(dto.contrasena, 10);
      const [usuario, conductor] = await this.prisma.$transaction([
        this.prisma.usuario.update({
          where: {
            ci: ci,
          },
          data: {
            ci: dto.ci,
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
        this.prisma.conductor.update({
          where: {
            id: dto.id,
          },
          data: {
            id_telefono: parseInt(dto.id_movil),
            id_movilidad: dto.id_movilidad,
            anos_experiencia: parseInt(dto.anos_experiencia),
            tipo_licencia: dto.tipo_licencia,
          },
        }),
      ]);
      return [usuario, conductor];
    } catch (error) {
      return { error: 'error' };
    }
  }
  async eliminar(ci: string) {
    try {
      const cliente = await this.prisma.$transaction([
        this.prisma.usuario.update({
          where: {
            ci: ci,
          },
          data: {
            estado: false,
          },
        }),
      ]);
      return cliente;
    } catch (error) {
      return error;
    }
  }
}
