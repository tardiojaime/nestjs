import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';

@Module({
  providers: [ProveedorService],
})
export class ProveedorModule {}
