import { ExecutionContext, Injectable } from '@nestjs/common';
import { LogsEntity } from './entities/logs.entity';
import { LogsDto } from './dto/logsDto';
import { FuncHelperEntity } from './entities/funcHelper.entity';
import { FuncHelperDto } from './dto/funcHelperDto';
import { Between, Not, Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { detect } from 'detect-browser';
import * as Excel from 'exceljs'

@Injectable()
export class LogsService { 
    constructor(
        @InjectRepository(LogsEntity)
        private readonly logsRepository: Repository<LogsEntity>,
        @InjectRepository(FuncHelperEntity)
        private readonly funHelperRepository: Repository<FuncHelperEntity>,
    ) {}


    async findAll(data: LogsDto): Promise<[LogsEntity[], number]> {

        let { startDate, currentDate } = this.getDate()
        if (data.currentDate !== undefined) {
            currentDate = data.currentDate
        }
        if (data.startDate  !== undefined) {
            startDate = data.startDate
        }

        let searchOptions: any = {
            ip : data.ip != null ? data.ip : Not(''),
            is_successful : data.is_successful != null ? data.is_successful : Not(''),
            username : data.username != null ? Like(data.username) : Not(''),
            using_browser : data.using_browser != null ? data.using_browser : Not(''),
            funcDesciption: Not(''),
            funcPath: Not(''),
            funcMethod: Not('')
            // funcDesciption : data.func.desciption == undefined || data.func.desciption == null ? Not(''): data.func.desciption,
            // funcPath :  data.func.path === undefined || data.func.path === null ? Not('') : data.func.path,
            // funcMethod : data.func.method === undefined || data.func.method === null ? Not('') : data.func.method
        }

        if(data.func){
            if(data.func.method){
                searchOptions.funcMethod = data.func.method
            }
    
            if(data.func.path){
                searchOptions.funcPath = data.func.path
            }
    
            if(data.func.desciption){
                searchOptions.funcDesciption = data.func.desciption
            } 
        }
       
        return  await this.logsRepository.findAndCount({
            relations: ['func'],
            where: { 
                ip: searchOptions.ip,
                is_successful: searchOptions.is_successful,
                username: searchOptions.username,
                using_browser: searchOptions.using_browser,
                date: Between(startDate, currentDate),
                func: {
                    desciption: searchOptions.funcDesciption,
                    method: searchOptions.funcMethod,
                    path: searchOptions.funcPath
                }
            },
            order: {
                date: 'DESC'
            } ,
            skip: data.offset,
            take: data.limit,
        })
    }

    async createExcel(data: LogsDto): Promise<any> {
        const workBook = new Excel.Workbook()
        const workSheet = workBook.addWorksheet('Audit Logs')

        workSheet.columns = [
            { header: 'Имя пользователя', key: 'username', width: 25 },
            { header: 'IP', key: 'ip', width: 15 },
            { header: 'Тип операции', key: 'method', width: 20 },
            { header: 'Действие', key: 'description', width: 40  },
            { header: 'Дата', key: 'date', width: 15},
            { header: 'Браузер', key: 'browser', width: 15 },
            { header: 'Результат', key: 'isSuccessful', width: 10 },
            { header: 'Тело запроса', key: 'reqData', width: 50,  }
        ]
       
        const find = await this.findAll(data)

        find[0].map(res =>{
            workSheet.addRow({
                username: res.username,
                ip: res.ip,
                method: res.func.method,
                description: res.func.desciption,
                data: res.date,
                browser: res.using_browser,
                isSuccessful: res.is_successful,
                reqData: res.req_body 
            })
        })

        return workBook

    }

    async postDataFuncHelper(data: FuncHelperDto): Promise<FuncHelperDto> {
        return await this.funHelperRepository.save(data)
    }

    async postDataLogs(data: LogsDto): Promise<LogsDto> {
        return await this.logsRepository.save(data)
    }


    async constructorData(context: ExecutionContext): Promise<void> {
        const request = context.getArgByIndex(0);
        const userAgent = request.headers["user-agent"]
        const statusReq = context.getArgByIndex(1).statusCode >= 400 ? false : true
        const path = request.path
        const func_name = context.getHandler().name
        let status = request.body.status === undefined ? null : request.body.status
        const method = this.constructorMethod(request.method, func_name)
        const funcHelper = await this.findFuncHelper(path, func_name, method)
        const body = request.body
        body.password != null ? body.password = '***' : ''

        const logData = {
            req_body: JSON.stringify(request.body),
            // ip: request.ip,
            ip: '111',
            // using_browser: detect(userAgent).name,
            using_browser: 'edge',
            username: 'qwe',
            is_successful: statusReq,
            func: funcHelper,
            date: this.getTimeStamp()
        }
   
        await this.logsRepository.save(logData)
    }

    inputDataFromGuard(context: ExecutionContext): void{
        context.getArgByIndex(1).statusCode = 403
        this.constructorData(context)
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


    getTimeStamp(): string {
        const date = new Date()
        date.setTime(date.getTime() + 60 * 1000 * 360)
        return date.toISOString()
    }

    getDate(): any {

        let startDate = new Date()
        startDate.setUTCHours(0, 0, 0, 0)
       
        return {
            startDate: startDate.toISOString(),
            currentDate: this.getTimeStamp()
        }

    }


    constructorMethod(method: string, handler: string): string {
        if(
            (method === 'POST') 
            && (handler.includes('find') 
            || handler.includes('getAlls') 
            || handler.includes('getRights') 
            || handler.includes('getManyBase'))) {
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


    async changeFunc(data: FuncHelperDto): Promise<any> {
        const funcHelper = await this.funHelperRepository.findOne({
            where: {
                id: data.uid
            }
        })
        Object.assign(funcHelper, data)
        return await this.funHelperRepository.update(funcHelper.uid, funcHelper)

    }

    async changeLog(data: any): Promise<any> {
        const logs = await this.logsRepository.findOne({
            where: {
                uid: data.uid
            }
        })
        logs.username = 'test'
        return await this.funHelperRepository.update(logs.uid, logs)

    }

}

