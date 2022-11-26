import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AlmacenDto } from 'src/dto';
import { AlmacenService } from './almacen.service';

@Controller('almacen')
export class AlmacenController {
  constructor(private almacenservice: AlmacenService) {}
  @Get()
  obtener() {
    return this.almacenservice.obtener();
  }
  @Get(':id')
  obteneruno(@Param() param) {
    return this.almacenservice.obteneruno(parseInt(param.id));
  }
  @Post()
  registrar(@Body() dto: AlmacenDto) {
    return this.almacenservice.registrar(dto);
  }
  @Put(':id')
  actualizar(@Param() param, @Body() dto: AlmacenDto) {
    return this.almacenservice.actualizar(parseInt(param.id), dto);
  }
}
