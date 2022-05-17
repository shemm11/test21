import { Controller, Get, Post, Put, Delete, Body, ForbiddenException } from '@nestjs/common';
import { PodsService } from './pods.service';
import { PodsDto } from './dto/pods.dto';

@Controller('pods')
export class PodsController { 

    constructor ( private readonly podsService: PodsService ) {}

    @Post('/get')
    async findPods(): Promise<PodsDto[]> {
        throw new ForbiddenException()
        return this.podsService.findAll()
    }


    @Post()
    async postPods(@Body() data: PodsDto): Promise<PodsDto> {
        return await this.podsService.savePod(data)
    }

    @Put()
    async statusPods(@Body() data: PodsDto): Promise<PodsDto[]> {
        return await this.podsService.changeStatus(data)
    }

}
