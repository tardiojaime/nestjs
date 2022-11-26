import { Module } from '@nestjs/common';
import { PedidoController } from 'src/pedido/pedido.controller';
import { ProductoService } from './producto.service';

@Module({
  providers: [ProductoService],
  controllers: [PedidoController],
  exports: [ProductoService],
})
export class ProductoModule {}
