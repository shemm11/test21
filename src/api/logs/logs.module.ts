import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { Global, Module } from '@nestjs/common';
import { FuncHelperEntity } from './entities/funcHelper.entity';
import { LogsEntity } from './entities/logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([FuncHelperEntity, LogsEntity])
    ],
    controllers: [
        LogsController,
    ],
    providers: [
        LogsService,
    ],
    exports: [
        LogsService
    ]
})
export class LogsModule { }
