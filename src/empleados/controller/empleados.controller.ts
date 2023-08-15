import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { EmpleadosService } from '../services/empleados.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/models/roles.enum';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { EmpleadoDto } from '../dto/update-empleado.dto';

@Controller('empleados')
export class EmpleadosController {

    constructor(private empleadosService:EmpleadosService,private authService:AuthService){}

    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard)
    @Roles(RolesEnum.ADMIN)
    @Get()
    async getAll(){
       return this.empleadosService.findAll(); 
    }

    @UseGuards(AuthGuard)
    @Get('/supervisores')
    async getSupervisores(){
      return  await this.empleadosService.findSupervisores();
    }

    @UseGuards(AuthGuard)
    @Get('documento/:documentoId')
    async getByDocumento(@Param() params: any){
      return this.empleadosService.findByDocument(params.documentoId)
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getById(@Param() params: any){
      return this.empleadosService.findByUserId(params.id)
    }

    
    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard)
    @Roles(RolesEnum.ADMIN)
    @Post('registro')
    async registro(@Body() body:RegisterDto){
      const empleado = await this.authService.register(body);
      return empleado;
    }


    @UseGuards(AuthGuard)
    //@UseGuards(RoleGuard)
    //@Roles(RolesEnum.ADMIN)
    @Post('update')
    async update(@Body()  empleadoDto:EmpleadoDto){
      const result = await this.empleadosService.update(empleadoDto);
      if (result.affected < 0)throw new HttpException('Ocurrió un error intenta más tarde', HttpStatus.INTERNAL_SERVER_ERROR); 
      return true;
    }

 
   
}
