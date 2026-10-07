import { Test, TestingModule } from "@nestjs/testing";
import { FilePathService } from "./file-path.service";

describe("FilePathService", () => {
  let service: FilePathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilePathService],
    }).compile();

    service = module.get<FilePathService>(FilePathService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
