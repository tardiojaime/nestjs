import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Post,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { telefonoService } from './movil.service';

@Controller('movil')
export class MovilController {
  constructor(private movilservice: telefonoService) {}
  @Get()
  obtener() {
    return this.movilservice.obtener();
  }
  @Get(':id')
  obteneruno(@Param() param) {
    return this.movilservice.obteneruno(parseInt(param.id));
  }
  @Post()
  registrar(@Body() dto: Prisma.telefonoCreateInput) {
    return this.movilservice.registrar(dto);
  }
  @Put(':id')
  actualizar(@Param() Param, @Body() dto: Prisma.telefonoUpdateInput) {
    return this.movilservice.actualizar(parseInt(Param.id), dto);
  }
  @Delete(':id')
  debaja(@Param() param) {
    return this.movilservice.debaja(parseInt(param.id));
  }
}
