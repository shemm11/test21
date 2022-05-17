import { PodsService } from './pods.service';
import { PodsController } from './pods.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodsEntity } from './entities/pods.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PodsEntity])
    ],
    controllers: [
        PodsController,],
    providers: [
        PodsService,],
    exports: [PodsService]
})
export class PodsModule { }
