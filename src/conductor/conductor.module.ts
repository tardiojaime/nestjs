import { Module } from '@nestjs/common';
import { ConductorController } from './conductor.controller';
import { ConductorService } from './conductor.service';

@Module({
  providers: [ConductorService],
  controllers: [ConductorController],
})
export class ClienteModule {}
