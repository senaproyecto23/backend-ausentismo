import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaDto } from 'src/listas/dto/lista.dto';
import { ContingenciaEntity } from 'src/listas/entities/contingencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContingenciaService {

    constructor(
        @InjectRepository(ContingenciaEntity)
        private repository:Repository<ContingenciaEntity>
    ){}

    getAll():Promise<ContingenciaEntity[]>{
        return this.repository.find({where:{activo:true}});
    }

    getByCode(codigo:number):Promise<ContingenciaEntity>{
        if(!codigo) throw new HttpException('codígo requerido', HttpStatus.BAD_REQUEST);
        return this.repository.findOne({where:{codigo,activo:true}})
    }

    getById(id:number):Promise<ContingenciaEntity>{
        if(!id) throw new HttpException('id requerido', HttpStatus.BAD_REQUEST);
        return this.repository.findOne({where:{id,activo:true}})
    }

    async crear(listaDTO:ListaDto):Promise<ContingenciaEntity>{
        const contingencia =  await this.getByCode(listaDTO.codigo);
        if(contingencia) throw new HttpException('El codígo ya existe', HttpStatus.BAD_REQUEST);
        return await this.repository.save({
            codigo:listaDTO.codigo,
            descripcion:listaDTO.descripcion
        });
    }

    async actualizar(listaDTO:ListaDto):Promise<boolean>{
        const contingencia =  await this.getById(listaDTO.id);
        if(! contingencia)  throw new HttpException('No existe la contingencia', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(contingencia.id,{descripcion:listaDTO.descripcion})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }


    async eliminar(listaDTO:ListaDto):Promise<boolean>{
        const contingencia =  await this.getById(listaDTO.id);
        if(! contingencia)  throw new HttpException('No existe la contingencia', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(contingencia.id,{activo:false})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }

}
