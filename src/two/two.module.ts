import { Module } from '@nestjs/common';
import { TwoController } from './two.controller';
import { TwoService } from './two.service';

@Module({
  controllers: [TwoController],
  providers: [TwoService],
  exports: [TwoService]
})
export class TwoModule { }
