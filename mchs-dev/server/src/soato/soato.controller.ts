import { Controller, Get } from '@nestjs/common';
import { SSoato } from './entity/soato.entity';
import { SoatoService } from './soato.service';

@Controller('soato')
export class SoatoController {
    constructor(private soatoService: SoatoService){}
    @Get('/get/all')
    getAllObjs(): Promise<SSoato[]>{
        
        return this.soatoService.getAll();
    }
}
