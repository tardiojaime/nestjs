import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacturaService {
  constructor(private prisma: PrismaService) {}
  async obtener() {
    try {
      const f = await this.prisma.factura.findMany();
      return f;
    } catch (error) {
      return error;
    }
  }
}
