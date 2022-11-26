import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';

@Module({
  providers: [RolService],
  controllers: [RolController],
  exports: [RolService],
})
export class RolModule {}
