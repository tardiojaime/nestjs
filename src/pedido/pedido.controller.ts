import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DtoPedido } from 'src/dto/dto';
import { DtoDetalle } from './actualizar.dto';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
  constructor(private pedidoservice: PedidoService) {}
  @Get()
  obtener() {
    return this.pedidoservice.obtenerPedidos();
  }
  @Get(':id')
  obteneruno(@Param() param) {
    return this.pedidoservice.alldetails(parseInt(param.id));
  }
  @Post()
  registrar(@Body() dto: DtoPedido) {
    return this.pedidoservice.regispedidos(dto);
  }
  @Patch(':id')
  actualizar(@Param() param, @Body() dto: DtoDetalle) {
    return this.pedidoservice.actualizar(parseInt(param.id), dto);
  }
  @Delete(':id')
  quitar(@Param() param) {
    return this.pedidoservice.quitar(parseInt(param.id));
  }
}
