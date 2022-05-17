import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogsService } from './logs.service';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  constructor( private readonly logService: LogsService ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    response.on('close', ()=>{
      this.logService.constructorData(context)
    })

    // console.log(response)
    // console.log(response.statusCode)




    return next.handle()
  }
}
