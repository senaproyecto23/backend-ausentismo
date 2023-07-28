import { Controller, Get } from '@nestjs/common';

import { SedesService } from 'src/listas/services/sedes/sedes.service';

@Controller('sedes')
export class SedesController {
    
    constructor(private sedeService:SedesService){}

    @Get()
    async getAll(){
        return await this.sedeService.getAll();
    }
}
