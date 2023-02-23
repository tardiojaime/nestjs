import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriaDto } from 'src/dto';
import { CategoriaService } from './categoria.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';
import { Roles } from 'src/auth/guards/roles.decorador';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rol } from 'src/auth/estrategias/rol.enum';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaservice: CategoriaService) {}
  @Roles(Rol.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  obetener() {
    return this.categoriaservice.obtener();
  }

  @Get(':id')
  Obteneruno(@Param() Param) {
    return this.categoriaservice.obtenercategoria(parseInt(Param.id));
  }
  @Post()
  registrar(@Body() dto: CategoriaDto) {
    return this.categoriaservice.registrar(dto);
  }
  @Put(':id')
  actualizar(@Param() param, @Body() dto: CategoriaDto) {
    return this.categoriaservice.actualizar(parseInt(param.id), dto);
  }
  @Delete(':id')
  eliminar(@Param() param) {
    return this.categoriaservice.eliminar(parseInt(param.id));
  }
}
