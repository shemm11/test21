import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { RegexEntity } from './entity/regex.entity';
import { RegexService } from './regex.service';
@Controller('regex')
export class RegexController {

    constructor(private readonly regexService: RegexService) {
        
    }

    @Get()
    async findAll(): Promise<any> {
        return await this.regexService.findAll();
    }

    @Post()
    async creatRegex(
      @Body() regexEntity: RegexEntity,
    ): Promise<any> {
        return await this.regexService.createRegex(regexEntity);
    }

    @Post('/getregex')
    async getRegex(
      @Body() regexEntity: RegexEntity,
    ): Promise<any> {
        return await this.regexService.getRegex();
    }

    @Put()
    async updateRegx(
      @Body() regexEntity: RegexEntity,
    ): Promise<any> {
        return await this.regexService.putRegex(regexEntity);
    }

    @Put()
    async deleteRegx(
      @Body() regexEntity: RegexEntity,
    ): Promise<any> {
        return await this.regexService.deleteRegex(regexEntity);
    }
}
//'regexCondition', 'regexSubst', 'regexNewSubst'