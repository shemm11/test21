import { Controller, Get, Post, Put, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { LogsEntity } from './entities/logs.entity';
import { FuncHelperDto } from './dto/getFuncHelperDto';
import { LogsService } from './logs.service';
import { LogsDto } from './dto/createLogsDto';
import { FuncHelperEntity } from './entities/funcHelper.entity';
import { GetLogsDto } from './dto/getLogsDto';

@Controller('logs')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LogsController { 

    constructor ( private readonly logsService: LogsService ) {}

    @Post()
    async findAll(@Body() data: GetLogsDto): Promise<any> {
        return this.logsService.findAll(data)
    }

    @Put('func')
    async changeFunc(@Body() data : FuncHelperDto): Promise<any> {
        return this.logsService.changeFunc(data)
    }

    @Put('log')
    async changeLog(@Body() data : FuncHelperDto): Promise<any> {
        return this.logsService.changeLog(data)
    }
    

    @Post('func')
    async postFuncHelper(@Body() data: FuncHelperDto): Promise<FuncHelperDto> {
        return await this.logsService.postDataFuncHelper(data)
    }

    @Post('logs')
    async postLogs(@Body() data: LogsDto): Promise<LogsDto> {
        return await this.logsService.postDataLogs(data)
    }

    @Post('test')
    async test(): Promise<any> {
        return 'dsad'
    }
}
