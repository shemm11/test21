import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from 'class-transformer';
import { ProviderDto } from "src/api/provider/dto/provider.dto";

export class RouteDto {

    
    uid?: string

    code?: string
    
    priority?: number

    code_porvider: ProviderDto

}

export class ProviderResponseDto extends ProviderDto {
    uid?: string
    code?: string
    priority?: string
    code_porvider
}