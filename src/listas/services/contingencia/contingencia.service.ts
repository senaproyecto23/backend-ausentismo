import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContingenciaEntity } from 'src/listas/entities/contingencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContingenciaService {

    constructor(
        @InjectRepository(ContingenciaEntity)
        private repository:Repository<ContingenciaEntity>
    ){}

    getAll():Promise<ContingenciaEntity[]>{
        return this.repository.find();
    }

    getByCode(codigo:number):Promise<ContingenciaEntity>{
        return this.repository.findOne({where:{codigo}})
    }
}
