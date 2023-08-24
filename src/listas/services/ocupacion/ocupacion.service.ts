import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaDto } from 'src/listas/dto/lista.dto';
import { OcupacionEntity } from 'src/listas/entities/ocupacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OcupacionService {

    constructor(@InjectRepository(OcupacionEntity)
        private repository:Repository<OcupacionEntity>
    ){}


    getAll():Promise<OcupacionEntity[]>{
        return this.repository.find({where:{activo:true}});
    }

    getByCode(codigo:number):Promise<OcupacionEntity>{
        return this.repository.findOne({where:{codigo,activo:true}});
    }

    getById(id:number):Promise<OcupacionEntity>{
        if(!id) throw new HttpException('id requerido', HttpStatus.BAD_REQUEST);
        return this.repository.findOne({where:{id,activo:true}})
    }

    async crear(listaDTO:ListaDto):Promise<OcupacionEntity>{
        const ocupacion =  await this.getByCode(listaDTO.codigo);
        if(ocupacion) throw new HttpException('El codígo ya existe', HttpStatus.BAD_REQUEST);
        return await this.repository.save({
            codigo:listaDTO.codigo,
            descripcion:listaDTO.descripcion
        });
    }

    async actualizar(listaDTO:ListaDto):Promise<boolean>{
        const ocupacion =  await this.getById(listaDTO.id);
        if(! ocupacion)  throw new HttpException('No existe la ocupación', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(ocupacion.id,{descripcion:listaDTO.descripcion})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }


    async eliminar(listaDTO:ListaDto):Promise<boolean>{
        const ocupacion =  await this.getById(listaDTO.id);
        if(! ocupacion)  throw new HttpException('No existe la ocupación', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(ocupacion.id,{activo:false})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }
}
