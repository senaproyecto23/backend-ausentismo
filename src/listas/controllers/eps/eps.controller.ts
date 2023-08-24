import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListaDto } from 'src/listas/dto/lista.dto';

import { EpsService } from 'src/listas/services/eps/eps.service';

@Controller('eps')
export class EpsController {

    constructor(private epsService:EpsService){}

    // @UseGuards(AuthGuard)
    @Get()
    async getAll(){
        return await this.epsService.getAll();
    }

  //  @UseGuards(AuthGuard)
  //  @UseGuards(RoleGuard)
  //  @Roles(RolesEnum.ADMIN)
  @Post('crear')
  async crear(@Body() listaDto:ListaDto){
      return await this.epsService.crear(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
 // @Roles(RolesEnum.ADMIN)
  @Post('actualizar')
  async update(@Body() listaDto:ListaDto){
      return await this.epsService.actualizar(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
  //@Roles(RolesEnum.ADMIN)
  @Post('eliminar')
  async eliminar(@Body() listaDto:ListaDto){
      return await this.epsService.eliminar(listaDto);
  }
}
