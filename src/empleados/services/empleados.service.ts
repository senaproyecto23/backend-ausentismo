import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmpleadoEntity } from '../entities/empleado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { EmpleadoDto } from '../dto/update-empleado.dto';
import { UsersService } from 'src/users/services/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesEnum } from 'src/auth/models/roles.enum';

@Injectable()
export class EmpleadosService {

    constructor(@InjectRepository(EmpleadoEntity)
    private empleadoRepository:Repository<EmpleadoEntity>,
    private userService:UsersService){}


    findAll():Promise<EmpleadoEntity[]>{
        return this.empleadoRepository.find();
    }

    async findById(id: number): Promise<EmpleadoEntity | null> {
        const empleado = await this.empleadoRepository.findOne({where:{id} });
        if(! empleado ) throw new HttpException('Empleado no existe', HttpStatus.NOT_FOUND);
        return   empleado ;
    }

    findByUserId(id: number): Promise<EmpleadoEntity | null> {
        const empleado = this.empleadoRepository.findOne({where:{usuarioId:id} });
        if(! empleado ) throw new HttpException('Empleado no existe', HttpStatus.NOT_FOUND);
        return   empleado ;
    }

    findByDocument(documento:string):Promise<EmpleadoEntity | null>{
        return this.empleadoRepository.findOne({where:{documento}})
    }

    save(empleado:EmpleadoEntity):Promise<EmpleadoEntity>{
        return this.empleadoRepository.save(empleado);
    }

    async update(empleadoDto:EmpleadoDto,columns:object={}):Promise<UpdateResult>{

        const empleado = await this.findById(empleadoDto.id);
        if( ! empleado ) throw new HttpException('Empleado no existe', HttpStatus.NOT_FOUND);
        return this.empleadoRepository.update(empleado.id,
            {
                nombre:empleadoDto.nombre,
                apellido:empleadoDto.apellido,
                genero:empleadoDto.genero,
                telefono:empleadoDto.telefono
            });
    }


    async findSupervisores():Promise<EmpleadoEntity[]>{
        const users:UserEntity[] = await this.userService.findAll();
        let usersSupervisores:number[] = users.filter(user=> user.rol == RolesEnum.SUPERVISOR).map(sup=> sup.id)
        const empleadoSuper = await this.empleadoRepository.findBy({usuarioId:In(usersSupervisores)})
        return  empleadoSuper;
    }
}
