import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LogsService } from './logs.service';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogsInterceptor.name);
  constructor( private readonly logService: LogsService ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(context.getArgByIndex(1).statusCode)
    return next.handle().pipe(
      map(data => {
        console.log(data)
        return data;
      }),
    )
  }

  // intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    
  //   this.logService.constructorData(context)

  //   const res = context.switchToHttp().getResponse();

  //   console.log(res)
  //   console.log(res.statusCode)

  //   return next.handle()

    
  // }
}
