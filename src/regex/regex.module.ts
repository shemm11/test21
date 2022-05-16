import { Module } from '@nestjs/common';
import { RegexController } from './regex.controller';
import { RegexService } from './regex.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegexEntity } from './entity/regex.entity';
import { TwoModule } from 'src/two/two.module';

@Module({  
    imports: [
        TypeOrmModule.forFeature([RegexEntity]),
        TwoModule
    ],
    controllers: [RegexController],
    providers: [RegexService],})
export class RegexModule {}
