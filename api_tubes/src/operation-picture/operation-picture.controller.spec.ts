import { Test, TestingModule } from "@nestjs/testing";
import { OperationPictureController } from "./operation-picture.controller";

describe("OperationPictureController", () => {
  let controller: OperationPictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationPictureController],
    }).compile();

    controller = module.get<OperationPictureController>(
      OperationPictureController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
