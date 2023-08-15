import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../../entities/departamento.entity';
import { Repository } from 'typeorm';
import { CiudadEntity } from 'src/listas/entities/ciudad.entity';

@Injectable()
export class UbicacionService {

    constructor(
        @InjectRepository(DepartamentoEntity)
        private departamentoRepository:Repository<DepartamentoEntity>,
        @InjectRepository(CiudadEntity)
        private ciudadRepository:Repository<CiudadEntity>
    ){}

    getDepartamentos():Promise<DepartamentoEntity[]>{
        return this.departamentoRepository.find();
    }

    getCiudades():Promise<CiudadEntity[]>{
        return this.ciudadRepository.find();
    }

    getCiudadByCodigo(codigo:number):Promise<CiudadEntity>{
        return this.ciudadRepository.findOne({where:{codigo}})
    }
}
