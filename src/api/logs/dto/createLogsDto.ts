import { ApiProperty } from "@nestjs/swagger";
import { FuncHelperDto } from "./getFuncHelperDto";

export class LogsDto {
    readonly offset: number = 0
    
    readonly limit: number = 25

    username?: string
    ip?: string
    func?: FuncHelperDto
    date?: Date
    using_browser?: string
    is_successful?: boolean
}
