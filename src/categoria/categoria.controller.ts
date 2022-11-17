import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriaDto } from 'src/dto';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
    constructor(private categoriaservice:CategoriaService){}
    @Get()
    obetener(){
        return this.categoriaservice.obtener();
    }
    @Post()
  registrar(@Body() dto: CategoriaDto) {
    return this.categoriaservice.registrar(dto);
  }
  @Put(':id')
  actualizar(@Param() param, @Body() dto: CategoriaDto){
    return this.categoriaservice.actualizar(parseInt(param.id), dto);
  }
  @Delete(':id')
  eliminar(@Param() param){
    return this.categoriaservice.eliminar(parseInt(param.id));
  }
}
