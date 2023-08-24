import { Body, Controller, Get, Post } from '@nestjs/common';

import { DiagnosticoService } from '../../services/diagnostico/diagnostico.service';
import { ListaDto } from 'src/listas/dto/lista.dto';

@Controller('diagnostico')
export class DiagnosticoController {

    constructor(private diagnosticoService:DiagnosticoService){}


//  @UseGuards(AuthGuard)
    @Get()
    async getAll(){
        return await this.diagnosticoService.getAll();
    }

//  @UseGuards(AuthGuard)
  //  @UseGuards(RoleGuard)
  //  @Roles(RolesEnum.ADMIN)
  @Post('crear')
  async crear(@Body() listaDto:ListaDto){
      return await this.diagnosticoService.crear(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
 // @Roles(RolesEnum.ADMIN)
  @Post('actualizar')
  async update(@Body() listaDto:ListaDto){
      return await this.diagnosticoService.actualizar(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
  //@Roles(RolesEnum.ADMIN)
  @Post('eliminar')
  async eliminar(@Body() listaDto:ListaDto){
      return await this.diagnosticoService.eliminar(listaDto);
  }

}


