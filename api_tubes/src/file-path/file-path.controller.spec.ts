import { Test, TestingModule } from '@nestjs/testing';
import { FilePathController } from './file-path.controller';

describe('FilePathController', () => {
  let controller: FilePathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilePathController],
    }).compile();

    controller = module.get<FilePathController>(FilePathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
