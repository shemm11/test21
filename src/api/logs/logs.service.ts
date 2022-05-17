import { ExecutionContext, HttpCode, Injectable, Body } from '@nestjs/common';
import { LogsEntity } from './entities/logs.entity';
import { FuncHelperDto } from './dto/getFuncHelperDto';
import { LogsDto } from './dto/createLogsDto';
import { FuncHelperEntity } from './entities/funcHelper.entity';
import { Between, Equal, getSqljsManager, Like, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { detect } from 'detect-browser';
import { GetLogsDto } from './dto/getLogsDto';
import { of } from 'rxjs';
import e from 'express';

@Injectable()
export class LogsService { 
    constructor(
        @InjectRepository(LogsEntity)
        private readonly logsRepository: Repository<LogsEntity>,
        @InjectRepository(FuncHelperEntity)
        private readonly funHelperRepository: Repository<FuncHelperEntity>,
    ) {}


    async findAll(data: GetLogsDto): Promise<any> {

        let { startDate, currentDate } = this.getDate()

        if (data.currentDate !== undefined) {
            currentDate = data.currentDate
        }

        if (data.startDate  !== undefined) {
            startDate = data.startDate
        }
        
        let searchOptions: any = {
            uid : data.uid != null ? data.uid : Not(''),
            ip : data.ip != null ? data.ip : Not(''),
            is_successful : data.is_successful != null ? data.is_successful : Not(''),
            username : data.username != null ? data.username : Not(''),
            date : data.date != null ? data.date : Not(Equal('')),
            using_browser : data.using_browser != null ? data.using_browser : Not(''),
            funcUid : null,
            funcDesciption : null,
            funcPath :  null,
            funcMethod :  null,
        }

        if(data.func){
            if(data.func.method){
                searchOptions.funcMethod = data.func.method
            } else {
                // searchOptions.funcMethod = Not('')
            }
    
            if(data.func.path){
                searchOptions.funcPath = data.func.path
            }
    
            if(data.func.uid){
                searchOptions.funcUid = data.func.uid
            }
    
            if(data.func.desciption){
                searchOptions.funcDesciption = data.func.desciption
            }
        }
       
        // console.log(searchOptions)



        // const method = searchOptions.funcMethod

        // console.log(method)

        // const test = await this.logsRepository
        //     .createQueryBuilder("logs")
        //     .leftJoinAndSelect("logs.func", "func")
        //     .where(`func.method ${method}`)
        //     // .where("username")
        //     .getSql()
        //     // .getMany()

        // return test

        
        return  await this.logsRepository.find({
            relations: ['func'],
            where: { 
                uid: searchOptions.uid,
                ip: searchOptions.ip,
                is_successful: searchOptions.is_successful,
                username: searchOptions.username,
                using_browser: searchOptions.using_browser,
                // date: Between(startDate, currentDate),
                func: {
                    // uid: searchOptions.funcUid == null? Not('') : searchOptions.funcUid,
                    uid: Not(''),
                    // desciption: searchOptions.funfuncDesciptioncUid == null? Not(''): searchOptions.funcDesciption,
                    path: searchOptions.funcPath == null? Not(''): searchOptions.funcPath,
                    // method: searchOptions.funcMethod == null? Not(''): searchOptions.funcMethod,
                }
            },
            skip: data.offset,
            take: data.limit,
        })
        //.then(res => {
        //     return res.filter(element =>{
        //         if(searchOptions.funcMethod != null && element.func.method == data.func.method){
        //             return element
        //         } 
        //         if(searchOptions.funcPath != null && element.func.path == data.func.path){
        //             return element
        //         } 
        //         if(searchOptions.funcDesciption != null && element.func.desciption == data.func.desciption){
        //             return element
        //         } 
        //         if(searchOptions.funcUid != null && element.func.uid == data.func.uid){
        //             return element
        //         } 
        //     })
        // })

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
        const statusReq = context.getArgByIndex(1).statusCode >= 400 ? false : true
        const path = request.path
        const func_name = context.getHandler().name
        let status = request.body.status === undefined ? null : request.body.status
        const method = this.constructorMethod(request.method, func_name)
        const funcHelper = await this.findFuncHelper(path, func_name, method)
        const body = request.body
        body.password != null ? body.password = '***' : ''

        const LogData = {
            req_data: request.body,
            ip: request.ip,
            // using_browser: detect(userAgent).name,
            using_browser: 'chrome',
            username: 'test',
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

        // console.log(logs.username)
        // console.log(data)

        // Object.assign(logs, data)

        logs.username = 'test'

        return await this.funHelperRepository.update(logs.uid, logs)

    }

}

