import { Injectable } from '@nestjs/common';
import { TemplatesEntity } from './entities/templates.entity';
import { TemplatesDto } from './dto/templates.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TemplatesService {

    constructor(
        @InjectRepository(TemplatesEntity)
        private readonly templatesRepository: Repository<TemplatesEntity>
    ) {}


    async getByIdRegex(uid:string): Promise<TemplatesEntity> {
        return await this.templatesRepository.findOne(uid)
    }

    async findAll(): Promise<TemplatesEntity[]> {

        const test = await this.templatesRepository.find({
            where: {
                regexCondition: '1231 '
            }
        });

        console.log(test)

        return await this.templatesRepository.find();


    }

    async getRegex(data: TemplatesDto): Promise<string> {
        const message = '1234 - код'
        return await this.maskingData(message)

    }

    async maskingData(message: string): Promise<string>{
        const templates =  await this.templatesRepository.find()

        for (let index = 0; index < templates.length; index++) {
            const element = templates[index];
            const condition : RegExp = new RegExp(element.condition);
            const subst : RegExp = new RegExp(element.subString, element.flags);
            const newSubst = element.newSubString;
    
            if (message.match(condition)) {
                message = message.replace(subst, newSubst)
                break
            }
            
        }
        
        return message
    }

    async createRegex(regexEntity: TemplatesDto): Promise<TemplatesEntity> {
        return await this.templatesRepository.save(regexEntity)
    }

    async putRegex(regexEntity: TemplatesDto): Promise<TemplatesEntity> {
        const regex = await this.getByIdRegex(regexEntity.uid)
        Object.assign(regex, regexEntity)
        return await this.templatesRepository.save(regexEntity)
    }

    async deleteRegex(regexEntity: TemplatesDto): Promise<DeleteResult> {
        const regex = await this.getByIdRegex(regexEntity.uid)
        return await this.templatesRepository.delete(regex)
    }
}
