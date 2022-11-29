import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ProductoService } from './producto.service';
import { diskStorage } from 'multer';
import { Prisma } from '@prisma/client';

export const storages = {
  storage: diskStorage({
    destination: 'public/productos/',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
      const ext = file.originalname.split('.');
      callback(
        null,
        file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1],
      );
    },
  }),
};

@Controller('producto')
export class ProductoController {
  private imagenes = [];
  constructor(private productoservice: ProductoService) {}
  @Post()
  @UseInterceptors(AnyFilesInterceptor(storages))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: Prisma.productoCreateInput,
  ) {
    const imagenes = [];
    const cargar = files.map((file) => {
      imagenes.push({ img: file.filename });
    });
    return this.productoservice.registrar(imagenes, dto);
  }
}
