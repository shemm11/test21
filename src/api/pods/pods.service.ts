import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PodsDto } from './dto/pods.dto';
import { PodsEntity } from './entities/pods.entity';


@Injectable()
export class PodsService { 
    constructor(
        @InjectRepository(PodsEntity)
        private readonly PodsRepository: Repository<PodsEntity>,
    ) {}


    async findAll(): Promise<PodsDto[]> {
        // throw new ForbiddenException('У вас нет прав для дальнейшего действия')
        return this.PodsRepository.find()
    }

    async savePod(data: PodsDto): Promise<PodsDto> {
        return await this.PodsRepository.save(data)
    }

    async changeStatus(data: PodsDto): Promise<PodsDto[]> {

        const pod = await this.PodsRepository.find({
            where: {
                uid: data.uid
            }
        })

        Object.assign(pod, data)

        return await this.PodsRepository.save(pod)
    }
}
