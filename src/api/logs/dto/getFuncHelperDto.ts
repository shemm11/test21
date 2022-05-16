import { ApiProperty } from "@nestjs/swagger";

export class FuncHelperDto {

    path: string
    desciption: string
    method: string
    
}

export class FuncHelperResponseDto extends FuncHelperDto {
    id: string
}