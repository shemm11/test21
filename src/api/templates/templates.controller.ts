import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TemplatesDto } from './dto/templates.dto';
import { TemplatesEntity } from './entities/templates.entity';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController { 

    constructor(private readonly templatesService: TemplatesService) { }

    @Get()
    async findAll(): Promise<TemplatesEntity[]> {
        return await this.templatesService.findAll();
    }

    @Post()
    async creatRegex(
      @Body() regexEntity: TemplatesDto,
    ): Promise<TemplatesEntity> {
        return await this.templatesService.createRegex(regexEntity);
    }

    @Put()
    async updateRegx(
      @Body() regexEntity: TemplatesDto,
    ): Promise<TemplatesEntity> {
        return await this.templatesService.putRegex(regexEntity);
    }

    @Put()
    async deleteRegx(
      @Body() regexEntity: TemplatesDto,
    ): Promise<DeleteResult> {
        return await this.templatesService.deleteRegex(regexEntity);
    }
    
    @Post('/test')
    async getRegex(
      @Body() data: TemplatesDto,
    ): Promise<string> {
        return await this.templatesService.getRegex(data);
    }
}
