import { QueueJobKeys } from "@/common/enums";
import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

export type IMailerJobData = {
  body: string;
  subject: string;
  to: string;
};

@Processor(QueueJobKeys.MAILER_JOB)
export class MailerJobProcessor {
  constructor(private readonly mailerService: MailerService) {}
  @Process()
  async process(job: Job<IMailerJobData>) {
    const { body, subject, to } = job.data;
    await this.mailerService.sendMail({
      to,
      subject,
      html: body,
    });
    return true;
  }
}
