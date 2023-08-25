import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ContingenciaService } from '../../services/contingencia/contingencia.service';
import { ListaDto } from 'src/listas/dto/lista.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role/role.guard';
import { RolesEnum } from 'src/auth/models/roles.enum';

@Controller('contingencia')
export class ContingenciaController {

    constructor(private contingenciaService:ContingenciaService){}

    //@UseGuards(AuthGuard)
    @Get()
    async getAll(){
        return await this.contingenciaService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:codigo')
    async getByCode(@Param() params: any){
        return await this.contingenciaService.getByCode(params.codigo);
    }

    @UseGuards(AuthGuard)
    @Get('id/:id')
    async getByid(@Param() params: any){
        return await this.contingenciaService.getById(params.id);
    }

  //  @UseGuards(AuthGuard)
  //  @UseGuards(RoleGuard)
  //  @Roles(RolesEnum.ADMIN)
    @Post('crear')
    async crear(@Body() listaDto:ListaDto){
        return await this.contingenciaService.crear(listaDto);
    }

   // @UseGuards(AuthGuard)
   // @UseGuards(RoleGuard)
   // @Roles(RolesEnum.ADMIN)
    @Post('actualizar')
    async update(@Body() listaDto:ListaDto){
        return await this.contingenciaService.actualizar(listaDto);
    }

   // @UseGuards(AuthGuard)
   // @UseGuards(RoleGuard)
    //@Roles(RolesEnum.ADMIN)
    @Post('eliminar')
    async eliminar(@Body() listaDto:ListaDto){
        return await this.contingenciaService.eliminar(listaDto);
    }

}
