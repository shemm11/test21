import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class FuncHelperDto {
    @IsString()
    @ApiProperty({ example: 'baa6b60b-fb6a-416d-ae4b-3ff1d4e07564', description: 'UID' })
    uid: string

    @IsString()
    @ApiProperty({ example: '/dashboards/history', description: 'Api path of request' })
    path: string

    @IsString()
    @ApiProperty({ example: 'Получение провайдеров', description: 'Description of the user action' })
    desciption: string

    @IsString()
    @ApiProperty({ example: 'SELECT', description: 'Method used in the request' })
    method: string
    
}

export class FuncHelperResponseDto extends FuncHelperDto {
    uid: string
    path: string
    desciption: string
    method: string
}