import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticoEntity } from 'src/listas/entities/diagnostico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosticoService {

    constructor(
        @InjectRepository(DiagnosticoEntity)
        private repository:Repository<DiagnosticoEntity>
    ){}


    getAll():Promise<DiagnosticoEntity[]>{
        return this.repository.find();
    }

    getByCode(codigo:string):Promise<DiagnosticoEntity>{
        return this.repository.findOne({where:{codigo}});
    }
}
