import { RouteModule } from './api/route/route.module';
import { ProviderModule } from './api/provider/provider.module';
import { TemplatesModule } from './api/templates/templates.module';
import { PodsModule } from './api/pods/pods.module';
import { LogsModule } from './api/logs/logs.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegexModule } from './regex/regex.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegexEntity } from './regex/entity/regex.entity';
import { LogsEntity } from './api/logs/entities/logs.entity';
import { FuncHelperEntity } from './api/logs/entities/funcHelper.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogsInterceptor } from './api/logs/logs.interceptor';
import { PodsEntity } from './api/pods/entities/pods.entity';
import { TemplatesEntity } from './api/templates/entities/templates.entity';
import { ProviderEntity } from './api/provider/entities/provider.entity';
import { RouteEntity } from './api/route/entities/route.entity';


@Module({
  imports: [
    RouteModule,
    ProviderModule,
    TemplatesModule,
    PodsModule,
    LogsModule,
    RegexModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'pa44word',
      database: 'bcc',
      entities: [
        RegexEntity,
        LogsEntity,
        FuncHelperEntity,
        PodsEntity,
        TemplatesEntity,
        ProviderEntity,
        RouteEntity
      ],
      synchronize: true,
      "migrations": ["src/migration/**/*.ts"
      ],
      "subscribers": ["src/subscriber/**/*.ts"
      ],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LogsInterceptor }
  ],
})
export class AppModule { }
