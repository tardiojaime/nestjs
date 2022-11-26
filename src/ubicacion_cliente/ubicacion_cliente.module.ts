import { Module } from '@nestjs/common';
import { UbicacionClienteController } from './ubicacion_cliente.controller';
import { UbicacionClienteService } from './ubicacion_cliente.service';

@Module({
  providers: [UbicacionClienteService],
  controllers: [UbicacionClienteController],
  exports: [UbicacionClienteService],
})
export class UbicacionClienteModule {}
