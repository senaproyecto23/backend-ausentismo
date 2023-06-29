import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository:Repository<UserEntity>
    ){}


    findAll():Promise<UserEntity[]>{
        return this.usersRepository.find();
    }

    findByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({where:{email} });
    }

    findById(id: number): Promise<UserEntity | null> {
        return this.usersRepository.findOne({where:{id} });
    }

    save(userEntity:UserEntity):Promise<UserEntity>{
        return this.usersRepository.save(userEntity);
    }

    update(userEntity:UserEntity,columns:object):Promise<UpdateResult>{ 
        return this.usersRepository.update(userEntity.id,columns)
    }
}
