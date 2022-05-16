import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities/route.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([RouteEntity])],
    controllers: [
        RouteController,],
    providers: [
        RouteService,],
    exports: [RouteService]
})
export class RouteModule { }
