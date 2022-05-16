import { ApiProperty } from '@nestjs/swagger' 

export class TemplatesDto {

    offset?: number = 0

    limit?: number = 25
   
    uid?: string
    
    condition: string

    subString: string

    newSubString: string

    flags: string

}

export class TemplatesResponseDto extends TemplatesDto {
    uid: string
    condition: string
    subString: string
    newSubString: string
    flags: string
}