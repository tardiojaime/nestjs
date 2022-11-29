import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProductoModule } from './producto/producto.module';
import { RolModule } from './rol/rol.module';
import { MovilModule } from './movil/movil.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { TareaModule } from './tarea/tarea.module';
import { FacturaModule } from './factura/factura.module';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoriaModule,
    ClienteModule,
    PedidoModule,
    ProductoModule,
    RolModule,
    MovilModule,
    VehiculoModule,
    ProveedorModule,
    TareaModule,
    FacturaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
