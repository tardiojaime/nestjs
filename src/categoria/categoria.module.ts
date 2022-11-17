import { Global, Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
@Global()
@Module({
    controllers: [CategoriaController],
    providers: [CategoriaService],
    exports: [CategoriaService],
})
export class CategoriaModule {}
