import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { AppModule } from "./app.module";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";
// import { BigIntInterceptor } from "./shared/lib/big-int-interceptor";
// import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT || 8100;
  const app = await NestFactory.create(AppModule, { logger: ["error"] });

  const httpAdapter = app.getHttpAdapter();

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.setGlobalPrefix("public_api");

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Tubes public API")
    .setDescription("Производство алюминиевых туб")
    .setVersion("0.1")
    .addTag("API")
    .build();

  const swaggerFactory: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerOptions,
  );
  SwaggerModule.setup("/public_api/swagger", app, swaggerFactory);

  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  // app.useGlobalInterceptors(new BigIntInterceptor());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   })
  // );

  // eslint-disable-next-line no-console
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}

void bootstrap().catch((err: unknown) => {
  console.error("Critical error during bootstrap:", err); // eslint-disable-line
  process.exit(1);
});
