import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SedesEntity } from 'src/listas/entities/sedes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SedesService {

    constructor(
        @InjectRepository(SedesEntity)
        private repository:Repository<SedesEntity>
    ){}


    getAll():Promise<SedesEntity[]>{
        return this.repository.find();
    }
}
