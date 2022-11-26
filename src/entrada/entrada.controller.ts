import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DtoEntrada } from 'src/dto/dto';
import { EntradaService } from './entrada.service';

@Controller('entrada')
export class EntradaController {
  constructor(private entradaservice: EntradaService) {}
  @Get()
  obtener() {
    return this.entradaservice.obtener();
  }
  @Get(':id')
  obteneruno(@Param() param) {
    return this.entradaservice.alldetails(parseInt(param.id));
  }
  @Post()
  registrar(@Body() dto: DtoEntrada) {
    return this.entradaservice.registrar(dto);
  }
  @Patch(':id')
  actualizardetalle(
    @Param() Param,
    @Body() dto: Prisma.detalle_entradaUpdateInput,
  ) {
    return this.entradaservice.actualizar(parseInt(Param.id), dto);
  }
  @Delete(':id')
  eliminar(@Param() param) {
    return this.entradaservice.quitar(parseInt(param.id));
  }
}
