import {
  Bind,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('vehiculos')
export class VehiculosController {
  @Get(':id')
  @Bind(Param())
  getVehiculos(params) {
    return `JSON.parse({ nombre: );${params.id})`;
  }
  @Post()
  saveVehiculo() {
    return 'save Vehiculos';
  }
  @Put()
  updateVehiculo() {
    return 'update vehiculos';
  }
  @Delete()
  deleteVehiculos() {
    return 'delete Vehiculos';
  }
}
