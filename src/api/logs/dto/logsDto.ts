import { ApiPropertyOptional } from '@nestjs/swagger' 
import { FuncHelperDto } from './funcHelperDto'
import { IsBoolean, IsDateString, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';


export class LogsDto {

    @ApiPropertyOptional({ example: 0, default: 0, description: 'an OFFSET from where to start returning data.' })
    @IsNumber()
    @IsOptional()
    readonly offset: number = 0
    @ApiPropertyOptional({ example: 25, default: 25, description: 'LIMIT the number of results that are returned' })
    @IsNumber()
    @IsOptional()
    readonly limit: number = 25
   
    @ApiPropertyOptional({ example: 'baa6b60b-fb6a-416d-ae4b-3ff1d4e07564', description: 'link to table permissions.tuser.uid' })
    @IsString()
    @IsOptional()
    username?: string

    @ApiPropertyOptional({ example: '10.20.32.71', description: 'User ip address' })
    @IsString()
    @IsOptional()
    ip?: string

    // @ApiPropertyOptional({ example: '2022-05-19T00:00:00', description: 'Transaction time' })
    // @IsDateString()
    // date?: Date

    @ApiPropertyOptional({ example: 'Chrome', description: 'User browser' })
    @IsString()
    @IsOptional()
    using_browser?: string

    @ApiPropertyOptional({ example: 'Успешно', description: 'Status of request' })
    @IsBoolean()
    @IsOptional()
    is_successful?: boolean
    
    // @ApiPropertyOptional({ example: '3519c2ca-3eec-488d-b107-5173b068ec4e', description: 'Link to table func_helper.uid' })
    @ApiPropertyOptional({ type: FuncHelperDto })
    @IsObject()
    @IsOptional()
    func?: FuncHelperDto

    @ApiPropertyOptional({ example: '{"dateBegin":"2022-05-19T00:00:00","dateEnd":"2022-05-19T09:36"}' , description: 'User request body' })
    @IsString()
    @IsOptional()
    req_body?: string

    @ApiPropertyOptional({ example: '2022-05-19T00:00:00', description: 'Start time to search' })
    @IsDateString()
    @IsOptional()
    startDate?: Date

    @ApiPropertyOptional({ example: '2022-05-19T00:00:00', description: 'End time to search' })
    @IsDateString()
    @IsOptional()
    currentDate?: Date

}

export class getLogsResponseDto extends LogsDto {
    uid: string
    username?: string
    ip?: string
    func?: FuncHelperDto
    date?: Date
    using_browser?: string
    is_successful?: boolean
    req_body: string
    count: number
}
