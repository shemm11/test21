import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteDto } from './dto/route.dto';
import { RouteEntity } from './entities/route.entity';

@Injectable()
export class RouteService {

    constructor (
        @InjectRepository(RouteEntity)
        private readonly routeRepository: Repository<RouteEntity>
    ) {}


    async findAll(): Promise<any> {
        return this.routeRepository.find()
    }


    async save(data: RouteDto): Promise<any> {
        return this.routeRepository.save(data)
    }


    async change(data: RouteDto): Promise<any> {
        const route = await this.routeRepository.find({
            where: {
                uid: data.uid
            }
        })

        Object.assign(route, data)

        return await this.routeRepository.save(route)
    }

 }
