import { Controller, Get } from '@nestjs/common';

import { OcupacionService } from 'src/listas/services/ocupacion/ocupacion.service';

@Controller('ocupacion')
export class OcupacionController {

    constructor(private ocupacionService:OcupacionService){}


    @Get()
    async getAll(){
        return await this.ocupacionService.getAll();
    }


}
