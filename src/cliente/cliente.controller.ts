import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Cliente } from 'src/dto';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private clienteservice: ClienteService) {}
  @Get()
  obtener() {
    return this.clienteservice.obtener();
  }
  @Get('/query')
  query() {
    return this.clienteservice.query();
  }
  @Post()
  registrar(@Body() dto: Cliente) {
    return this.clienteservice.registrar(dto);
  }
  @Put()
  actuilizar(@Body() dto: Cliente) {
    return this.clienteservice.actualizar(dto);
  }
  @Delete(':id')
  eliminar(@Param() param) {
    return this.clienteservice.eliminar(param.id);
  }
}
