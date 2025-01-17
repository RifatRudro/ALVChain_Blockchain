import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { BullModule } from "@nestjs/bull";
import { QueueJobKeys } from "@/common/enums";

@Module({
  imports: [   BullModule.registerQueue({
    name: QueueJobKeys.MAILER_JOB,
  }),],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
