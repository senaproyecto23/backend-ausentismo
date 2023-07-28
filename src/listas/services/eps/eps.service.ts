import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpsEntity } from 'src/listas/entities/eps.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpsService {

    constructor( @InjectRepository(EpsEntity)
            private epsRepository:Repository<EpsEntity>
    ){}


    getAll():Promise<EpsEntity[]>{
        return this.epsRepository.find();
    }
}
