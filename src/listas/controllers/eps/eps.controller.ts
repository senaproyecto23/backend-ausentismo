import { Controller, Get } from '@nestjs/common';

import { EpsService } from 'src/listas/services/eps/eps.service';

@Controller('eps')
export class EpsController {

    constructor(private epsService:EpsService){}

    @Get()
    async getAll(){
        return await this.epsService.getAll();
    }
}
