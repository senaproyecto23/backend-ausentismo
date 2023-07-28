import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OcupacionEntity } from 'src/listas/entities/ocupacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OcupacionService {

    constructor(@InjectRepository(OcupacionEntity)
        private respository:Repository<OcupacionEntity>
    ){}


    getAll():Promise<OcupacionEntity[]>{
        return this.respository.find();
    }
}
