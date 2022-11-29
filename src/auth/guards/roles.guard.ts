import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private _reflec: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // obtenemos los roles de la ruta
    const roles: string[] = this._reflec.get('roles', context.getHandler());
    // si no hay roles lo pasamos
    if (!roles) {
      return true;
    }
    // pero si no, obtenemos al usuario que se logueo
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // sacamos su rol y lo comparamos si ese rol esta permitido para 
    // ingresar a la ruta    console.log(user.rol.nombre);
    const rols = () => roles.includes(user.rol.nombre);
    return user && user.rol && rols();
  }
}
