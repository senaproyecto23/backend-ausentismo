import { Controller, Get } from '@nestjs/common';

import { ContingenciaService } from '../../services/contingencia/contingencia.service';

@Controller('contingencia')
export class ContingenciaController {

    constructor(private contingenciaService:ContingenciaService){}


    @Get()
    async getAll(){
        return await this.contingenciaService.getAll();
    }
}
