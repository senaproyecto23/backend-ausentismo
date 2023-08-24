import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { EmpleadoEntity } from './entities/empleado.entity';
import { EmpleadosController } from './controller/empleados.controller';
import { EmpleadosService } from './services/empleados.service';
import { EmpresaEntity } from './entities/empresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[forwardRef(()=>AuthModule),
    forwardRef(()=>UsersModule),
    TypeOrmModule.forFeature([EmpleadoEntity,EmpresaEntity])],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  exports:[EmpleadosService]
})
export class EmpleadosModule {}
