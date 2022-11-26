import { Prisma } from '@prisma/client';

export class CategoriaDto {
  categoria: string;
  peso: number;
}
export class AlmacenDto {
  almacen: string;
  latitud: string;
  longitud: string;
  capacidad: number;
}
export class UbicacionCliente {
  id_cliente: string;
  calle_numero: string;
  latitud: string;
  longitud: string;
}
export class Cliente {
  ci: string;
  rol: number;
  usuario: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  email: string;
  fechanacimiento: Date;
  telefono: string;
  sexo: string;
  calle_numero: string;
  latitud: string;
  longitud: string;
}
export class Conductor {
  ci: string;
  rol: number;
  usuario: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  email: string;
  fechanacimiento: Date;
  telefono: string;
  sexo: string;
  id_movil: number;
  id_movilidad: string;
  anos_experiencia: number;
  tipo_licencia: string;
}
export class DtoPedido {
  id_cliente: string;
  fechapedido: string;
  fechaentrega: string;
  total: number;
  id_producto: [];
  cantidad: [];
  precio: [];
}
export class DtoEntrada {
  id_usuario: string;
  id_proveedor: string;
  id_almacen: number;
  fechapedido: string;
  fechaentrega: string;
  total: number;
  id_producto: [];
  cantidad: [];
  precio: [];
}
