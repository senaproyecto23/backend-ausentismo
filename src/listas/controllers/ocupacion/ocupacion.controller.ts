import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListaDto } from 'src/listas/dto/lista.dto';

import { OcupacionService } from 'src/listas/services/ocupacion/ocupacion.service';

@Controller('ocupacion')
export class OcupacionController {

    constructor(private ocupacionService:OcupacionService){}

    //  @UseGuards(AuthGuard)
    @Get()
    async getAll(){
        return await this.ocupacionService.getAll();
    }


  //  @UseGuards(AuthGuard)
  //  @UseGuards(RoleGuard)
  //  @Roles(RolesEnum.ADMIN)
  @Post('crear')
  async crear(@Body() listaDto:ListaDto){
      return await this.ocupacionService.crear(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
 // @Roles(RolesEnum.ADMIN)
  @Post('actualizar')
  async update(@Body() listaDto:ListaDto){
      return await this.ocupacionService.actualizar(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
  //@Roles(RolesEnum.ADMIN)
  @Post('eliminar')
  async eliminar(@Body() listaDto:ListaDto){
      return await this.ocupacionService.eliminar(listaDto);
  }


}
