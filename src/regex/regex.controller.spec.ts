import { Test, TestingModule } from '@nestjs/testing';
import { RegexController } from './regex.controller';

describe('RegexController', () => {
  let controller: RegexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegexController],
    }).compile();

    controller = module.get<RegexController>(RegexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
