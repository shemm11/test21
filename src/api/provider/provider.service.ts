import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderDto } from './dto/provider.dto';
import { ProviderEntity } from './entities/provider.entity';

@Injectable()
export class ProviderService {

    constructor(
        @InjectRepository(ProviderEntity)
        private readonly providerRepository: Repository<ProviderEntity>
    ) {}


    async findAll(): Promise<any> {
        return this.providerRepository.find()
    }

    async save(data: ProviderDto): Promise<any> {
        return this.providerRepository.save(data)
    }

}
