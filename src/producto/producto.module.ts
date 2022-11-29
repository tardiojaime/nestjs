import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { MulterModule } from '@nestjs/platform-express';
import path from 'path';
@Module({
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
