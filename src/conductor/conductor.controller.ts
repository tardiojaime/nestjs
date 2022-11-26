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
    return this.conductorservice.obtener();
  }
  @Post()
  registrar(@Body() dto: Conductor) {
    return this.conductorservice.registrar(dto);
  }
  @Put()
  actuilizar(@Body() dto: Conductor) {
    return this.conductorservice.actualizar(dto);
  }
  @Delete(':id')
  eliminar(@Param() param) {
    return this.conductorservice.eliminar(param.id);
  }
}
