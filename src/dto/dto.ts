export class CategoriaDto {
  categoria: string;
  peso: string;
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
  ciA: string;
  usuario: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  email: string;
  fechanacimiento: string;
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
  fechanacimiento: string;
  telefono: string;
  sexo: string;
  id_movil: string;
  id_movilidad: string;
  anos_experiencia: string;
  tipo_licencia: string;
  id?: number;
}
export class DtoPedido {
  id_cliente: number;
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
