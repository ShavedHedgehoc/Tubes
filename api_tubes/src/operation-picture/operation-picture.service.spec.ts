import { Test, TestingModule } from "@nestjs/testing";
import { OperationPictureService } from "./operation-picture.service";

describe("OperationPictureService", () => {
  let service: OperationPictureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationPictureService],
    }).compile();

    service = module.get<OperationPictureService>(OperationPictureService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
