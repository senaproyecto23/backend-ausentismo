import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaDto } from 'src/listas/dto/lista.dto';
import { DiagnosticoEntity } from 'src/listas/entities/diagnostico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosticoService {

    constructor(
        @InjectRepository(DiagnosticoEntity)
        private repository:Repository<DiagnosticoEntity>
    ){}


    getAll():Promise<DiagnosticoEntity[]>{
        return this.repository.find({where:{activo:true}});
    }

    getByCode(codigo:string):Promise<DiagnosticoEntity>{
        return this.repository.findOne({where:{codigo,activo:true}});
    }

    getById(id:number):Promise<DiagnosticoEntity>{
        if(!id) throw new HttpException('id requerido', HttpStatus.BAD_REQUEST);
        return this.repository.findOne({where:{id,activo:true}})
    }

    async crear(listaDTO:ListaDto):Promise<DiagnosticoEntity>{
        const diagnostico =  await this.getByCode(listaDTO.codigo.toString());
        if(diagnostico) throw new HttpException('El codígo ya existe', HttpStatus.BAD_REQUEST);
        return await this.repository.save({
            codigo:listaDTO.codigo.toString(),
            descripcion:listaDTO.descripcion
        });
    }

    async actualizar(listaDTO:ListaDto):Promise<boolean>{
        const diagnostico =  await this.getById(listaDTO.id);
        if(! diagnostico)  throw new HttpException('No existe el diagnostico', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(diagnostico.id,{descripcion:listaDTO.descripcion})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }


    async eliminar(listaDTO:ListaDto):Promise<boolean>{
        const diagnostico =  await this.getById(listaDTO.id);
        if(! diagnostico)  throw new HttpException('No existe el diagnostico', HttpStatus.NOT_FOUND);
        const result = await this.repository.update(diagnostico.id,{activo:false})
        if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR);                                
        return true; 
    }
}
