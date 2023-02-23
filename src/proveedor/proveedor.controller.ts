import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProveedorService } from './proveedor.service';

@Controller('proveedor')
export class ProveedorController {
  constructor(private provaider: ProveedorService) {}

  @Get()
  obtener() {
    return this.provaider.obtener();
  }
  @Get('/:ci')
  obtenerUno(@Param() param){
    return this.provaider.obteneruno(param.ci);
  }
  @Post()
  registrar(@Body() obj: Prisma.proveedorCreateInput) {
    return this.provaider.registrar(obj);
  }
  @Put('/:ci')
  update(@Param() param, @Body() obj: Prisma.proveedorUpdateInput) {
    return this.provaider.actualizar(param.ci, obj);
  }
  @Delete('/:ci')
  eliminar(@Param() param) {
    return this.provaider.debaja(param.ci);
  }
}
