import { ConfigModule, ConfigService } from '@nestjs/config'

import { AusentismoModule } from './ausentismo/ausentismo.module';
import { AuthModule } from './auth/auth.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EmpleadosModule,
    AusentismoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [],
        autoLoadEntities:true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UtilsModule,
    AusentismoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
