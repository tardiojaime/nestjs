import { MomentModule } from '@ccmos/nestjs-moment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
MomentModule.forRoot({ tz: 'America/La_Paz' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
