import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaDto } from 'src/listas/dto/lista.dto';
import { EpsEntity } from 'src/listas/entities/eps.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpsService {

    constructor( @InjectRepository(EpsEntity)
            private epsRepository:Repository<EpsEntity>
    ){}


    getAll():Promise<EpsEntity[]>{
        return this.epsRepository.find({where:{activo:true}});
    }

    getByCode(codigo:number):Promise<EpsEntity>{
        if(!codigo) throw new HttpException('codígo requerido', HttpStatus.BAD_REQUEST);
        return this.epsRepository.findOne({where:{codigo: codigo.toString(),activo:true}})
    }

    getById(id:number):Promise<EpsEntity>{
        if(!id) throw new HttpException('id requerido', HttpStatus.BAD_REQUEST);
        return this.epsRepository.findOne({where:{id,activo:true}})
    }

    async crear(listaDTO:ListaDto):Promise<EpsEntity>{
        const eps =  await this.getByCode(listaDTO.codigo);
        if(eps) throw new HttpException('El codígo ya existe', HttpStatus.BAD_REQUEST);
        return await this.epsRepository.save({
            codigo:listaDTO.codigo.toString(),
            nombre:listaDTO.descripcion
        });
    }

    async actualizar(listaDTO:ListaDto):Promise<boolean>{
        const eps =  await this.getById(listaDTO.id);
        if(! eps)  throw new HttpException('No existe la eps', HttpStatus.NOT_FOUND);

        const epsCodigo =  await this.getByCode(listaDTO.codigo);
        if(epsCodigo) throw new HttpException('El codígo ya existe', HttpStatus.BAD_REQUEST);

        const result = await this.epsRepository.update(eps.id,{
            codigo:listaDTO.codigo.toString(),
            nombre:listaDTO.descripcion
        })
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }


    async eliminar(listaDTO:ListaDto):Promise<boolean>{
        const eps =  await this.getById(listaDTO.id);
        if(! eps)  throw new HttpException('No existe la eps', HttpStatus.NOT_FOUND);
        const result = await this.epsRepository.update(eps.id,{activo:false})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }
}
