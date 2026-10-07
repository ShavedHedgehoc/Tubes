import { DynamicModule, Module, Type } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
// import { EmployeesModule } from "./employees/employees.module";
// import { ParamsModule } from "./params/params.module";
// import { HealthCheckModule } from "./health-check/health-check.module";
// import { ConveyorsModule } from "./conveyors/conveyors.module";
// import { SummariesModule } from "./summaries/summaries.module";
// import { ConsumedMaterialsModule } from "./consumed-materials/consumed-materials.module";
// import { ProductsModule } from "./products/products.module";
// import { UploadModule } from "./upload/upload.module";
// import { StatusesModule } from "./statuses/statuses.module";
// import { OperationsModule } from "./operations/operations.module";
// import { ZplModule } from "./zpl/zpl.module";
// import { ProductionBoxModule } from "./production-box/production-box.module";
// import { PrinterModule } from "./printer/printer.module";
// import { RanksModule } from "./ranks/ranks.module";
// import { TresholdsModule } from "./tresholds/tresholds.module";
// import { UsersModule } from "./users/users.module";
// import { AuthModule } from "./auth/auth.module";
// import { FilePathModule } from "./file-path/file-path.module";
// import { ProductPictureModule } from "./product-picture/product-picture.module";
// import { OperationPictureModule } from "./operation-picture/operation-picture.module";
// import { RolesModule } from "./roles/roles.module";
// import { MaintenanceLogModule } from "./maintenance-log/maintenance-log.module";
// import { PostsModule } from "./posts/post.module";
// import { CrewsModule } from "./crews/crews.module";
import { SummariesModule } from "./summaries/summaries.module";

const imports: Array<Type<unknown> | DynamicModule | Promise<DynamicModule>> = [
  ConfigModule.forRoot(),
  PrismaModule,
  SummariesModule,
  //   ParamsModule,
  //   ConsumedMaterialsModule,
  //   EmployeesModule,
  //   ConveyorsModule,
  //   HealthCheckModule,
  //   ProductsModule,
  //   UploadModule,
  //   StatusesModule,
  //   OperationsModule,
  //   ZplModule,
  //   ProductionBoxModule,
  //   PrinterModule,
  //   RanksModule,
  //   TresholdsModule,
  //   UsersModule,
  //   AuthModule,
  //   FilePathModule,
  //   ProductPictureModule,
  //   OperationPictureModule,
  //   AuthModule,
  //   RolesModule,
  //   MaintenanceLogModule,
  //   PostsModule,
  //   CrewsModule,
];

@Module({
  imports: imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
