import { Controller, Get } from '@nestjs/common';

import { DiagnosticoService } from '../../services/diagnostico/diagnostico.service';

@Controller('diagnostico')
export class DiagnosticoController {

    constructor(private diagnosticoService:DiagnosticoService){}



    @Get()
    async getAll(){
        return await this.diagnosticoService.getAll();
    }

}


