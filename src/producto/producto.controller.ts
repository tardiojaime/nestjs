import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ProductoService } from './producto.service';
import { diskStorage } from 'multer';
import { Prisma } from '@prisma/client';
import { of } from 'rxjs';
import { join } from 'path';
import { UploadedFile } from '@nestjs/common/decorators';

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
  constructor(private productoservice: ProductoService) {}
  /* de tipo estructura de JsonArray */
  @Post('/varios')
  @UseInterceptors(AnyFilesInterceptor(storages))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: Prisma.productoCreateInput,
  ) {
    const imagenes = [];
    const cargar = files.map((file) => {
      imagenes.push({ img: file.filename });
    });
    return this.productoservice.registrarImgs(imagenes, dto);
  }
  @Get()
  obtener() {
    return this.productoservice.obtener();
  }
  @Get('/:category')
  ObtenerporCate(@Param() param) {
    return this.productoservice.obtenerinformacion(param.category);
  }
  @Get('/images/:name')
  oneimage(@Param() param, @Res() res) {
    console.log(param.name);
    return of(
      res.sendFile(join(process.cwd(), 'public/productos/' + param.name)),
    );
  }
}
export const renameImage = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const filename = file.originalname;
  const rand = Date.now() + '-' + Math.round(Math.random());
  callback(null, `${name}${rand}${filename}`);
  console.log(`${name}${rand}${filename}`);
};
