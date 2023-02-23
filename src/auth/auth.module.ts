import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategia } from './estrategias/jwt.strategia';
import { Roles } from './guards/roles.decorador';
@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '100s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategia],
  exports: [AuthService],
})
export class AuthModule {}
