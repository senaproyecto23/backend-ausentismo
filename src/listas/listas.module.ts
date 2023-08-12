import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { CiudadEntity } from './entities/ciudad.entity';
import { ContingenciaController } from './controllers/contingencia/contingencia.controller';
import { ContingenciaEntity } from './entities/contingencia.entity';
import { ContingenciaService } from './services/contingencia/contingencia.service';
import { DepartamentoEntity } from './entities/departamento.entity';
import { DiagnosticoController } from './controllers/diagnostico/diagnostico.controller';
import { DiagnosticoEntity } from './entities/diagnostico.entity';
import { DiagnosticoService } from './services/diagnostico/diagnostico.service';
import { EpsController } from './controllers/eps/eps.controller';
import { EpsEntity } from './entities/eps.entity';
import { EpsService } from './services/eps/eps.service';
import { OcupacionController } from './controllers/ocupacion/ocupacion.controller';
import { OcupacionEntity } from './entities/ocupacion.entity';
import { OcupacionService } from './services/ocupacion/ocupacion.service';
import { ProcesosController } from './controllers/procesos/procesos.controller';
import { ProcesosEntity } from './entities/procesos.entity';
import { ProcesosService } from './services/procesos/procesos.service';
import { SedesController } from './controllers/sedes/sedes.controller';
import { SedesEntity } from './entities/sedes.entity';
import { SedesService } from './services/sedes/sedes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionController } from './controllers/ubicacion/ubicacion.controller';
import { UbicacionService } from './services/ubicacion/ubicacion.service';

@Module({
  controllers: [EpsController,UbicacionController, 
                ContingenciaController, OcupacionController, 
                DiagnosticoController, SedesController, ProcesosController],
  imports:[forwardRef(()=>AuthModule),
    TypeOrmModule.forFeature([CiudadEntity,DepartamentoEntity,
                              ContingenciaEntity,EpsEntity,
                              DiagnosticoEntity,OcupacionEntity,
                              ProcesosEntity,SedesEntity])
  ],
  providers: [UbicacionService, EpsService, ContingenciaService, 
            OcupacionService, DiagnosticoService, ProcesosService, SedesService],
  exports:[OcupacionService,ContingenciaService,DiagnosticoService]
  
})
export class ListasModule {}
