import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListaDto } from 'src/listas/dto/lista.dto';

import { ProcesosService } from 'src/listas/services/procesos/procesos.service';

@Controller('procesos')
export class ProcesosController {

    constructor(
        private service:ProcesosService
    ){}

//  @UseGuards(AuthGuard)
    @Get()
    async getAll(){
        return await this.service.getAll();
    }


    //  @UseGuards(AuthGuard)
  //  @UseGuards(RoleGuard)
  //  @Roles(RolesEnum.ADMIN)
  @Post('crear')
  async crear(@Body() listaDto:ListaDto){
      return await this.service.crear(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
 // @Roles(RolesEnum.ADMIN)
  @Post('actualizar')
  async update(@Body() listaDto:ListaDto){
      return await this.service.actualizar(listaDto);
  }

 // @UseGuards(AuthGuard)
 // @UseGuards(RoleGuard)
  //@Roles(RolesEnum.ADMIN)
  @Post('eliminar')
  async eliminar(@Body() listaDto:ListaDto){
      return await this.service.eliminar(listaDto);
  }
}
