import { Test, TestingModule } from "@nestjs/testing";
import { MaintenanceLogController } from "./maintenance-log.controller";

describe("MaintenanceLogController", () => {
  let controller: MaintenanceLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceLogController],
    }).compile();

    controller = module.get<MaintenanceLogController>(MaintenanceLogController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
