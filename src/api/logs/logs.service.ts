import { ExecutionContext, HttpCode, Injectable, Body } from '@nestjs/common';
import { LogsEntity } from './entities/logs.entity';
import { FuncHelperDto } from './dto/getFuncHelperDto';
import { LogsDto } from './dto/createLogsDto';
import { FuncHelperEntity } from './entities/funcHelper.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { detect } from 'detect-browser';
import { GetLogsDto } from './dto/getLogsDto';

@Injectable()
export class LogsService { 
    constructor(
        @InjectRepository(LogsEntity)
        private readonly logsRepository: Repository<LogsEntity>,
        @InjectRepository(FuncHelperEntity)
        private readonly funHelperRepository: Repository<FuncHelperEntity>,
    ) {}


    async findAll(data: GetLogsDto): Promise<LogsEntity[]> {

        let { startDate, currentDate } = this.getDate()

        if (data.currentDate !== undefined) {
            currentDate = data.currentDate
        }

        if (data.startDate  !== undefined) {
            startDate = data.startDate
        }

        return  await this.logsRepository.find({
            relations: ['func'],
            where: [
                // { crud_type: data.crud_type },
                { username: data.username },
                { ip: data.ip },
                { is_successful: data.is_successful },
                { using_browser: data.using_browser },
                { func: data.func },
                { date: Between(startDate, currentDate)}
            ],
            skip: data.offset,
            take: data.limit
        })

    }

    async postDataFuncHelper(data: FuncHelperDto): Promise<FuncHelperEntity> {
        return await this.funHelperRepository.save(data)
    }

    async postDataLogs(data: LogsDto): Promise<LogsDto> {
        return await this.logsRepository.save(data)
    }


    async constructorData(context: ExecutionContext): Promise<void> {
        
        const request = context.getArgByIndex(0);
        const userAgent = request.headers["user-agent"]
        const pizdec = context.switchToHttp().getResponse()
        // console.log(pizdec)
        // console.log(context)
        // console.log(context.getArgByIndex(1))
        // console.log(context.getArgByIndex(1).statusCode)
        const statusReq = pizdec.statusCode >= 400 ? false : true
        // console.log(statusReq)
        // console.log(context.getArgByIndex(1))
        const path = request.path
        console.log(context.getHandler().name)
        const func_name = context.getHandler().name
        let status = request.body.status === undefined ? null : request.body.status
        const method = this.constructorMethod(request.method, func_name)
        const funcHelper = await this.findFuncHelper(path, func_name, method)


        const LogData = {
            req_data: request.body,
            ip: request.ip,
            // using_browser: detect(userAgent).name,
            using_browser: 'chrome',
            username: 'USMANOVR',
            is_successful: statusReq,
            func: funcHelper,
            date: this.getTimeStamp()
        }
   
        this.saveData(LogData)

    }

    async saveData(data: object): Promise<void> {
        const test = await this.logsRepository.save(data)
    }


    async findFuncHelper(path: string, name: string, method: string): Promise<FuncHelperEntity> {

        const funcHelper = await this.funHelperRepository.find({
            where: {
                path: path,
                method: method
            }
        })

        if (funcHelper.length > 0) {
            return funcHelper[0]
        } 

        const data = {
            path: path,
            func: name,
            desciption: 'I NEED DESC',
            method: method
        }

        return  await this.funHelperRepository.save(data)
    }

    detectStatusCode(statusCode: number): boolean {
        if (statusCode > 400) {
            return false
        } else {
            return true
        }

    }

    getTimeStamp(): string {

        const date = new Date()
        date.setTime(date.getTime() + 60 * 1000 * 360)
        return date.toISOString()

    }

    getDate(): any {

        const startDate = new Date()
        startDate.setUTCHours(0, 0, 0, 0)
        startDate.toISOString()

        return {
            startDate: startDate,
            currentDate: this.getTimeStamp()
        }

    }


    constructorMethod(method: string, handler: string): string {
        if(method === 'POST' && handler.includes('find')) {
            return 'SELECT'
        }

        switch (method) {
            case 'POST':
                    return 'INSERT'
                break;
        
            case 'GET': 
                return 'SELECT'
                break
            
            case 'PUT': 
                return 'UPDATE'
                break
            case 'DELETE': 
                return 'DELETE'
                break
            case 'PATCH':
                return 'UPDATE'
                break
            default:
                return method
                break;
        }

    }

}

