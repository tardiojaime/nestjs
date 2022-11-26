import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UbicacionCliente } from 'src/dto';
import { UbicacionClienteService } from './ubicacion_cliente.service';

@Controller('ubicacion-cliente')
export class UbicacionClienteController {
  constructor(private ubicacionservice: UbicacionClienteService) {}

  @Get()
  obtener() {
    return this.ubicacionservice.obtener();
  }
  @Get(':id')
  obteneruno(@Param() ci) {
    return this.ubicacionservice.obteneruno(ci);
  }
  @Post()
  registrar(@Body() dto: UbicacionCliente) {
    return this.ubicacionservice.registrar(dto);
  }
  @Put(':id')
  actualizar(@Param() param, @Body() dto: UbicacionCliente) {
    return this.ubicacionservice.actualizar(param.id, dto);
  }
  @Delete(':id')
  eliminar(@Param() param) {
    return this.ubicacionservice.eliminar(param.id);
  }
}
