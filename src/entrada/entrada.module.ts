import { Module } from '@nestjs/common';
import { EntradaController } from './entrada.controller';
import { EntradaService } from './entrada.service';
@Module({
  providers: [EntradaService],
  controllers: [EntradaController],
})
export class PedidoModule {}
