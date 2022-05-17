import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from 'class-transformer';

export class PodsDto {

    
    uid: string

    status: boolean = true

    name: string
}

export class PodsResponseDto extends PodsDto {
    uid: string
    status: boolean;
    name: string
}