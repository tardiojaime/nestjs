import { Module } from '@nestjs/common';
import { AlmacenController } from './almacen.controller';
import { AlmacenService } from './almacen.service';

@Module({
  controllers: [AlmacenController],
  providers: [AlmacenService],
})
export class AlmacenModule {}
