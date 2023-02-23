import { Module } from '@nestjs/common';
import { MovilController } from './movil.controller';
import { telefonoService } from './movil.service';

@Module({
  controllers: [MovilController],
  providers: [telefonoService],
})
export class MovilModule {}
