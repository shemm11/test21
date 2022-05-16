import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesEntity } from './entities/templates.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TemplatesEntity])],
    controllers: [
        TemplatesController,],
    providers: [
        TemplatesService,],
})
export class TemplatesModule { }
