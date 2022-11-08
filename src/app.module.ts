import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ClienteController } from './cliente/cliente.controller';
import { VehiculosController } from './vehiculos/vehiculos.controller';
import { PedidosController } from './pedidos/pedidos.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    ClienteController,
    VehiculosController,
    PedidosController,
  ],
  providers: [AppService],
})
export class AppModule { }
