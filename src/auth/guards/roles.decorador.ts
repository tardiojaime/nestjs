import { SetMetadata } from '@nestjs/common';
import { Rol } from '../estrategias/rol.enum';

export const Roles = (...roles: Rol[]) => SetMetadata('roles', roles);
