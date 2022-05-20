import { LogsEntity } from './entities/logs.entity';
import { Controller, Post, Put, Body, UsePipes, ValidationPipe, Header, Res } from '@nestjs/common';
import { FuncHelperDto } from './dto/funcHelperDto';
import { LogsService } from './logs.service';
import { LogsDto } from './dto/logsDto';
import { Response } from 'express'
import { ApiResponse } from '@nestjs/swagger';
import * as Excel from 'exceljs'

@Controller('logs')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LogsController { 

    constructor ( 
        private readonly logsService: LogsService 

        ) {}

    @Post()
    async findAll(@Body() data: LogsDto): Promise<[LogsEntity[], number]> {
        return this.logsService.findAll(data)
    }

    @Post('excel')
    @Header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    @Header('Content-Disposition', 'attachment; filename=auditLogs.xlsx')
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async excel(@Body() data: LogsDto, @Res() res: Response): Promise<void> {
        const workbook = await this.logsService.createExcel(data)

        
        return workbook.xlsx.write(res).then(() => {
            res.status(200).end()
        })

    }


    @Put('func')
    async changeFuncHelper(@Body() data : FuncHelperDto): Promise<FuncHelperDto> {
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

}
