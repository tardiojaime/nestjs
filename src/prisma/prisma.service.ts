import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// OnModuleInit --Se llama una vez que se han resuelto las dependencias del módulo host.
// OnModuleDestroy --SIGTERMLlamado después de que se haya recibido una señal de terminación (p. ej., ).

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://root:@localhost:3306/gestion_entrega?schema=public',
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
