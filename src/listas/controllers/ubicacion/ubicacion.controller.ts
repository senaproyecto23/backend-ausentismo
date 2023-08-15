import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UbicacionService } from '../../services/ubicacion/ubicacion.service';

@Controller('ubicacion')
export class UbicacionController {

    constructor(private ubicacionService:UbicacionService){}
    
    
    @UseGuards(AuthGuard)
    @Get('/departamentos')
    async getDepartamentos(){
        return await this.ubicacionService.getDepartamentos();
    }

    @UseGuards(AuthGuard)
    @Get('/ciudades')
    async getCiudades(){
        return await this.ubicacionService.getCiudades();
    }

    @UseGuards(AuthGuard)
    @Get('/ciudades/:codigo')
    async getCiudadByCodigo(@Param() params: any){
        return await this.ubicacionService.getCiudadByCodigo(params.codigo);
    }
}
 

