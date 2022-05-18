import { ApiProperty } from '@nestjs/swagger' 
import { FuncHelperDto } from './getFuncHelperDto'
import { Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';


export class GetLogsDto {

    @ApiProperty()
    @IsNumber()
    readonly offset: number = 0
    @ApiProperty()
    @IsNumber()
    readonly limit: number = 25
   
    @ApiProperty()
    username?: string

    @ApiProperty()
    ip?: string

    func?: FuncHelperDto

    date?: Date

    using_browser?: string

    is_successful?: boolean

    req_body?: string

    startDate?: Date

    currentDate?: Date

}

export class getLogsResponseDto extends GetLogsDto {
    uid: string
    username?: string
    ip?: string
    func?: FuncHelperDto
    date?: Date
    using_browser?: string
    is_successful?: boolean
}
