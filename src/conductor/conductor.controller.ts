import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Conductor } from 'src/dto';
import { ConductorService } from './conductor.service';

@Controller('conductor')
export class ConductorController {
  constructor(private conductorservice: ConductorService) {}
  @Get()
  obtener() {
    return this.conductorservice.obtenerQ();
  }
  @Get('/telefono')
  telefono() {
    return this.conductorservice.telefono();
  }
  @Get('/vehiculo')
  vehiculo() {
    return this.conductorservice.Vehiculo();
  }
  @Get('/:ci')
  obtenerUNO(@Param() Param) {
    return this.conductorservice.obtenerUno(Param.ci);
  }
  @Post()
  registrar(@Body() dto: Conductor) {
    return this.conductorservice.registrar(dto);
  }
  @Put('/:ci')
  actuilizar(@Param() Param, @Body() dto: Conductor) {
    return this.conductorservice.actualizar(Param.ci, dto);
  }
  @Delete(':id')
  eliminar(@Param() param) {
    return this.conductorservice.eliminar(param.id);
  }
}
