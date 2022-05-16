import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { RouteDto } from './dto/route.dto';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {

    constructor (
        private readonly routeService: RouteService
    ) {}


    @Get()
    async findAll(): Promise<any>{
        return this.routeService.findAll()
    }


    @Post()
    async save(@Body() data: RouteDto): Promise<any>{
        console.log(data)
        return this.routeService.save(data)
    }

    @Put()
    async change(@Body() data: RouteDto): Promise<any>{
        return this.routeService.change(data)
    }

}
