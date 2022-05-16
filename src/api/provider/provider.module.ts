import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from './entities/provider.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([ProviderEntity])],
    controllers: [
        ProviderController,],
    providers: [
        ProviderService,],
    exports: [ProviderService]
})
export class ProviderModule { }
