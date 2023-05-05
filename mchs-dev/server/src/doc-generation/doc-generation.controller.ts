import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DocGenerationService } from './doc-generation.service';

@Controller('doc-generation')
export class DocGenerationController {
    constructor(private readonly docService: DocGenerationService){}

    @Post('gen1')
    generateDoc(@Body() dto:genDocDTO){
        return this.docService.generate1(dto);
    }
    @Post('gen1_0')
    generateDoc1_0(@Body() dto:genDocDTO3){
        return this.docService.generate1_0(dto);
    }
    @Post('gen3')
    generateDoc3(@Body() dto:genDocDTO3){
        return this.docService.generate3(dto);
    }
    @Post('gen3_0')
    generateDoc3_0(@Body() dto:genDocDTO3){
        return this.docService.generate3_0(dto);
    }
    @Post('gen4_0')
    generateDoc4_0(@Body() dto:genDocDTO3){
        return this.docService.generate4_0(dto);
    }
    @Post('gen5')
    generateDoc5(@Body() dto:genDocDTO3){
        return this.docService.generate5(dto);
    }
    @Post('gen5_0')
    generateDoc5_0(@Body() dto:genDocDTO3){
        return this.docService.generate5_0(dto);
    }
    @Post('gen6')
    generateDoc6(@Body() dto:genDocDTO3){
        return this.docService.generate6(dto);
    }
    @Post('gen7')
    generateDoc7(@Body() dto:genDocDTO3){
        return this.docService.generate7(dto);
    }
    @Post('gen9')
    generateDoc9(@Body() dto:genDocDTO3){
        return this.docService.generate9(dto);
    }
    @Post('gen14')
    generateDoc14(@Body() dto:genDocDTO14){
        return this.docService.generate14(dto);
    }
    @Post('gen15')
    generateDoc15(@Body() dto:genDocDTO3){
        return this.docService.generate15(dto);
    }
    @Post('gen17')
    generateDoc17(@Body() dto:genDocDTO3){
        return this.docService.generate17(dto);
    }
    @Post('gen18')
    generateDoc18(@Body() dto:genDocDTO3){
        return this.docService.generate18(dto);
    }
    @Post('gen20')
    generateDoc20(@Body() dto:genDocDTO3){
        return this.docService.generate20(dto);
    }
    @Post('gen31')
    generateDoc31(@Body() dto:genDocDTO3){
        return this.docService.generate31(dto);
    }
    @Post('gen34')
    generateDoc34(@Body() dto:genDocDTO3){
        return this.docService.generate34(dto);
    }
    @Post('gen43')
    generateDoc43(@Body() dto:genDocDTO3){
        return this.docService.generate43(dto);
    }
    @Post('gen44')
    generateDoc44(@Body() dto:genDocDTO3){
        return this.docService.generate44(dto);
    }
    @Post('gen49')
    generateDoc49(@Body() dto:genDocDTO3){
        return this.docService.generate49(dto);
    }
    @Post('gen50')
    generateDoc50(@Body() dto:genDocDTO3){
        return this.docService.generate50(dto);
    }
    generate1_ch
    @Post('gen1_ch')
    generateDoc1_ch(@Body() dto:genDocDTO3){
        return this.docService.generate1_ch(dto);
    }
    
    generate2_ch
    @Post('gen2_ch')
    generateDoc2_ch(@Body() dto:genDocDTO3){
        
        return this.docService.generate2_ch(dto);
    }
    generate3_ch
    @Post('gen1_ch')
    generateDoc3_ch(@Body() dto:genDocDTO3){
        return this.docService.generate3_ch(dto);
    }
    
}
