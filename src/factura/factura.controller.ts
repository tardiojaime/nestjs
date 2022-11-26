import { Controller, Get } from '@nestjs/common';
import { FacturaService } from './factura.service';

@Controller('factura')
export class FacturaController {
  constructor(private facturaservice: FacturaService) {}
  @Get()
  obtener() {
    return this.facturaservice.obtener();
  }
}
