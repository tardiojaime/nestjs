import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { VehiculoService } from './vehiculo.service';

@Controller('vehiculo')
export class VehiculoController {
  constructor(private movilidad: VehiculoService) {}
  @Get()
  obtener() {
    return this.movilidad.obtener();
  }
  @Get(':id')
  obteneruno(@Param() param) {
    return this.movilidad.obteneruno(param.id);
  }
  @Post()
  registrar(@Body() dto: Prisma.movilidadCreateInput) {
    return this.movilidad.registrar(dto);
  }
  @Put(':id')
  actualizar(@Param() param, @Body() dto: Prisma.movilidadUpdateInput) {
    return this.movilidad.actulizar(param.id, dto);
  }
  @Delete(':id')
  debaja(@Param() param) {
    return this.movilidad.debaja(param.id);
  }
}
