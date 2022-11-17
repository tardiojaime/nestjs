import { Injectable } from '@nestjs/common';
import { CategoriaDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}
    async obtener() {
        const categoria = await this.prisma.categoria.findMany();
        return categoria;
    }
    async registrar(dto:CategoriaDto) {
        const categoria = await this.prisma.categoria.create({
            data:{
                categoria:dto.categoria,
                peso:dto.peso,
            },
        });
        return categoria;
    }
    async obtenercategoria(id:number){
        const categoria = await this.prisma.categoria.findUnique({
            where:{
                id : id,
            },
        });
        return categoria;
    }
  async actualizar(id: number, dto) {
    try {        
        const categoria = await this.prisma.categoria.update({
            where:{
                id: id,
            },
            data:{
                categoria:dto.categoria, 
                peso: dto.peso,
            },
        });
        return categoria;
    } catch (error) {
        return error;
    }
    }
  async eliminar(id: number) {
    try {
        const categoria = await this.prisma.categoria.delete({
            where:{
                id: id,
            },
        });
        return categoria;
    } catch (error) {
        return error;
    }
  }
}
