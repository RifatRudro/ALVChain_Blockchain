import { AppModule } from "@/app.module";
// import { QueueJobKeys } from "@/common/enums";
import { reqlog } from "@/common/utilities/log.utils";
import { appConfig } from "@/config";
// import { createBullBoard } from "@bull-board/api";
// import { BullAdapter } from "@bull-board/api/bullAdapter";
// import { ExpressAdapter } from "@bull-board/express";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// import { Queue } from "bull";
import * as dotenv from "dotenv";
import * as morgan from "morgan";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api");
  if (appConfig.env.NODE_ENV === "development") {
    // Bull Board
    // const serverAdapter = new ExpressAdapter();
    // serverAdapter.setBasePath("/bull-board");
    // createBullBoard({
    //   queues: Object.values(QueueJobKeys).map(
    //     (key) => new BullAdapter(app.get<Queue>(`BullQueue_${key}`)),
    //   ),
    //   serverAdapter,
    // });
    // app.use("/bull-board", serverAdapter.getRouter());
    // Swagger
    const config = new DocumentBuilder()
      .setTitle("Al-Kalam Backend")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }
  app.enableCors({
    origin: "*",
    credentials: true,
    methods: "*",
    preflightContinue: true,
  });
  // Logger
  if (appConfig.env.REQ_LOG)
    app.use(
      morgan("tiny", {
        stream: {
          write: (message) => reqlog(message.replace(/\n$/, "")),
        },
      }),
    );
  app.enableShutdownHooks();
  const PORT = appConfig.env.PORT;
  const _server = await app.listen(PORT, '0.0.0.0');
  Logger.log(`Server running on http://localhost:${PORT}`, "Bootstrap");
}

bootstrap();
