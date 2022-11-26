import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
  constructor(private rolservice: RolService) {}

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
  @Patch()
  debaja(@Body() dto: Prisma.rolUncheckedCreateInput) {
    return this.rolservice.debaja(dto);
  }
}
