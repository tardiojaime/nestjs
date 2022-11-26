import { Module } from '@nestjs/common';
import { MovilController } from './movil.controller';
import { MovilService } from './movil.service';

@Module({
  controllers: [MovilController],
  providers: [MovilService],
})
export class MovilModule {}
