import { Controller, Get } from '@nestjs/common';

import { ProcesosService } from 'src/listas/services/procesos/procesos.service';

@Controller('procesos')
export class ProcesosController {

    constructor(
        private service:ProcesosService
    ){}


    @Get()
    async getAll(){
        return await this.service.getAll();
    }

}
