import { ApiProperty } from "@nestjs/swagger";

export class FuncHelperDto {

    uid: string
    path: string
    desciption: string
    method: string
    
}

export class FuncHelperResponseDto extends FuncHelperDto {
    uid: string
    path: string
    desciption: string
    method: string
}