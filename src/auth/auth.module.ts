import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth.service';
import { EmpleadosModule } from 'src/empleados/empleados.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RoleGuard } from './guards/role/role.guard';
import { UsersModule } from 'src/users/users.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService,AuthGuard,RoleGuard],
  imports:[
    UsersModule,
    EmpleadosModule,
    JwtModule.registerAsync({
      global:true,
      imports:[ConfigModule],
      useFactory:(configService: ConfigService) => ({
        secret:configService.get('JWT_SECRET'),
        signOptions:{expiresIn:'5m'}
      }),
      inject:[ConfigService]
    }),
    ConfigModule,
    UtilsModule
  ],
  exports:[AuthService,AuthGuard,RoleGuard]
})
export class AuthModule {}
