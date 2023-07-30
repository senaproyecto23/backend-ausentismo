import { Module, forwardRef } from '@nestjs/common';

import { AusentismoController } from './controllers/ausentismo/ausentismo.controller';
import { AusentismoDocumentsEntity } from './entities/ausentismo-documents.entity';
import { AusentismoEntity } from './entities/ausentismo.entity';
import { AusentismoService } from './services/ausentismo/ausentismo.service';
import { AuthModule } from 'src/auth/auth.module';
import { EmpleadosModule } from 'src/empleados/empleados.module';
import { ReporteEntity } from './entities/reporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports:[forwardRef(()=>AuthModule) ,
    forwardRef(()=>UtilsModule),
    forwardRef(()=>EmpleadosModule),
    TypeOrmModule.forFeature([AusentismoEntity,AusentismoDocumentsEntity,ReporteEntity])
  ],
  controllers: [AusentismoController],
  providers: [AusentismoService],
  exports:[AusentismoService]
})
export class AusentismoModule {}
