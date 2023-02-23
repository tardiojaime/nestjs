import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';
import { Roles } from 'src/auth/guards/roles.decorador';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolService } from './rol.service';
import { Rol } from 'src/auth/estrategias/rol.enum';

@Controller('rol')
export class RolController {
  constructor(private rolservice: RolService) {}
  // Quitamos el servicio de autenticacion jwt
  //@Roles(Rol.Admin)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  obtener() {
    return this.rolservice.obtener();
  }
  @Get(':id')
  obteneruno(@Param() param) {
    return this.rolservice.obteneruno(parseInt(param.id));
  }
  @Post()
  registrar(@Body() dto: Prisma.rolCreateInput) {
    return this.rolservice.registrar(dto);
  }
  @Put(':id')
  actualizar(@Param() param, @Body() dto: Prisma.rolUpdateInput) {
    return this.rolservice.actualizar(parseInt(param.id), dto);
  }
  @Delete(':id')
  elimnar(@Param() param) {
    return this.rolservice.eliminar(parseInt(param.id));
  }
  @Patch()
  debaja(@Body() dto: Prisma.rolUncheckedCreateInput) {
    return this.rolservice.debaja(dto);
  }
}
