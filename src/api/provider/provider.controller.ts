import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProviderDto } from './dto/provider.dto';
import { ProviderService } from './provider.service';

@Controller('providers')
export class ProviderController {

    constructor (
        private readonly providerService: ProviderService
    ) {}


    @Get()
    async findAll(): Promise<any>{
        return this.providerService.findAll()
    }


    @Post()
    async save(@Body() data: ProviderDto): Promise<any>{
        console.log(data)
        return this.providerService.save(data)
    }

}
