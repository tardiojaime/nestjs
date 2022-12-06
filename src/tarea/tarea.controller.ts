import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TareaService } from './tarea.service';

@Controller('tarea')
export class TareaController {
  constructor(private tareaservice: TareaService) {}
  @Get()
  obtener() {
    return this.tareaservice.obtener();
  }
  @Post()
  registrar(@Body() dto: Prisma.tareaCreateInput) {
    return this.tareaservice.registrar(dto);
  }
}
