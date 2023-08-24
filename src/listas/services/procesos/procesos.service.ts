import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaDto } from 'src/listas/dto/lista.dto';
import { OcupacionEntity } from 'src/listas/entities/ocupacion.entity';
import { ProcesosEntity } from 'src/listas/entities/procesos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcesosService {

    constructor(
        @InjectRepository(ProcesosEntity)
        private repository:Repository<ProcesosEntity>
    ){}


    getAll():Promise<ProcesosEntity[]>{
        return this.repository.find({where:{activo:true}});
    }

    getByCode(codigo:number):Promise<ProcesosEntity>{
        return this.repository.findOne({where:{codigo,activo:true}});
    }

    getById(id:number):Promise<ProcesosEntity>{
        if(!id) throw new HttpException('id requerido', HttpStatus.BAD_REQUEST);
        return this.repository.findOne({where:{id,activo:true}})
    }

    async crear(listaDTO:ListaDto):Promise<ProcesosEntity>{
        const proceso =  await this.getByCode(listaDTO.codigo);
        if(proceso) throw new HttpException('El codígo ya existe', HttpStatus.BAD_REQUEST);
        return await this.repository.save({
            codigo:listaDTO.codigo,
            descripcion:listaDTO.descripcion
        });
    }

    async actualizar(listaDTO:ListaDto):Promise<boolean>{
        const proceso =  await this.getById(listaDTO.id);
        if(! proceso)  throw new HttpException('No existe el proceso', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(proceso.id,{descripcion:listaDTO.descripcion})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }


    async eliminar(listaDTO:ListaDto):Promise<boolean>{
        const proceso =  await this.getById(listaDTO.id);
        if(! proceso)  throw new HttpException('No existe el proceso', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(proceso.id,{activo:false})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }
}
