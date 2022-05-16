import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { RegexEntity } from './entity/regex.entity';
import { TwoService } from 'src/two/two.service';

@Injectable()
export class RegexService {
    
    // regextEntity = RegexEntity


    constructor(
        @InjectRepository(RegexEntity)
        private readonly regexRepository: Repository<RegexEntity>,
        private twoService: TwoService
    ) {}

    async getByIdRegex(id:number): Promise<RegexEntity> {
        return await this.regexRepository.findOne(id)
    }

    async findAll(): Promise<RegexEntity[]> {

        const test = await this.regexRepository.find({
            where: {
                regexCondition: '1231 '
            }
        });

        console.log(test)

        return await this.regexRepository.find();


    }

    async getRegex(): Promise<any> {
        const message = '1234 - код'
        const maskingData = this.maskingData(message)
        
        console.log(this.twoService.test())
        

        return  maskingData
    }

    async maskingData(message: string): Promise<string>{
        const array =  await this.regexRepository.find()

        array.forEach(item =>{
            const condition : RegExp = new RegExp(item.regexCondition, item.flasg);
            const subst : RegExp = new RegExp(item.regexSubst, item.flasg);
            const newSubst = item.regexNewSubst;

            if (message.match(condition)) {
                console.log(message.replace(subst, newSubst))
                message = message.replace(subst, newSubst)
            }
        })
        return message
    }

    async createRegex(regexEntity: RegexEntity): Promise<RegexEntity> {
        return await this.regexRepository.save(regexEntity)
    }

    async putRegex(regexEntity: RegexEntity): Promise<RegexEntity> {
        const regex = await this.getByIdRegex(regexEntity.id)
        Object.assign(regex, regexEntity)
        return await this.regexRepository.save(regexEntity)
    }

    async deleteRegex(regexEntity: RegexEntity): Promise<DeleteResult> {
        const regex = await this.getByIdRegex(regexEntity.id)
        return await this.regexRepository.delete(regex)
    }



}
