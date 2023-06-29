import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/models/roles.enum';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){

    }

    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard)
    @Roles(RolesEnum.ADMIN)
    @Get()
    async findUsers():Promise<UserEntity[]>{
        return this.usersService.findAll();
    }
}
