import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PedidoController } from './pedido/pedido.controller';
import { ClienteController } from './cliente/cliente.controller';
import { VehiculosController } from './vehiculos/vehiculos.controller';
import { PedidoModule } from './pedido/pedido.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    PedidoModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoriaModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ClienteController,
    VehiculosController,
    PedidoController,
    AuthController,
    CategoriaController,
  ],
  providers: [AppService, UsersService, CategoriaService],
})
export class AppModule {}
