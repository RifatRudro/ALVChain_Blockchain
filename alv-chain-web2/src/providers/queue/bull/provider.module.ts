import { MailerJobProcessor } from "@/jobs/mailer-job.processor";
import { Module } from "@nestjs/common";

@Module({
  providers: [MailerJobProcessor],
  imports: [],
})
export class JobProcessorModule {}
