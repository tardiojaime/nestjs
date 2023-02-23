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
    return this.clienteservice.query();
  }
  @Get('/object')
  query() {
    return this.clienteservice.obtener();
  }
  @Get('/:id')
  onteneruno(@Param() param) {
    return this.clienteservice.obtenerUnoQ(param.id);
  }
  @Post()
  registrar(@Body() dto: Cliente) {
    return this.clienteservice.registrar(dto);
  }
  @Put('/:ci')
  actuilizar(@Param() param, @Body() dto: Cliente) {
    return this.clienteservice.actualizar(param.ci, dto);
  }
  @Delete('/:ci')
  eliminar(@Param() param) {
    return this.clienteservice.eliminar(param.ci);
  }
}
