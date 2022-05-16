import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from 'class-transformer';

export class ProviderDto {

    
    uid?: string

    operator?: string
    
    // @Transform(({ value }) => new Boolean(value))

    description?: string

    code?: string

    status?: boolean = true
}

export class ProviderResponseDto extends ProviderDto {
    uid: string
    operator: string
    description: string
    code: string
    status: boolean = true
}