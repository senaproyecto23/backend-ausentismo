import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcesosEntity } from 'src/listas/entities/procesos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcesosService {

    constructor(
        @InjectRepository(ProcesosEntity)
        private repository:Repository<ProcesosEntity>
    ){}


    getAll():Promise<ProcesosEntity[]>{
        return this.repository.find();
    }

    getByCode(codigo:number):Promise<ProcesosEntity>{
        return this.repository.findOne({where:{codigo}});
    }
}
