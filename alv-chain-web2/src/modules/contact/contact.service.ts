import { QueueJobKeys } from "@/common/enums";
import { IMailerJobData } from "@/jobs/mailer-job.processor";
import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Queue } from "bull";
import { ContactDto } from "./dto/contact.dto";

@Injectable()
export class ContactService {
  constructor(
    @InjectQueue(QueueJobKeys.MAILER_JOB)
    private readonly mailerJob: Queue<IMailerJobData>,
  ) {}

  async sendEmails(dto: ContactDto) {
    // this.mailerJob.add(
    //   {
    //     to: "info@alkalam.org",
    //     body: `
    //         Hello Souhayl Maronesy,<br><br>

    //         You have received a new submission from your contact form. Here are the details:<br><br>

    //         <b>Name</b>: ${dto.name}<br>
    //         <b>Phone</b>: ${dto.phone}<br>
    //         <b>Email</b>: ${dto.email}<br><br>

    //         <b>Message</b>:<br>
    //         ${dto.message}<br><br>

    //         Please respond to this inquiry at your earliest convenience.`,
    //     subject: "al-KALAM Contact Form", //dto.subject,
    //   },
    //   { attempts: 3, removeOnComplete: true },
    // );
    // return {
    //   success: true,
    //   message: "Email sent successfully",
    // };
    await this.sendMainUsingEmailJs(dto);
  }

  async sendMainUsingEmailJs(dto: ContactDto) {
    try {
      const SERVICE_ID = process.env.SERVICE_ID;
      const TEMPLATE_ID_MESSAGE = process.env.TEMPLATE_ID_MESSAGE;
      const USER_ID = process.env.USER_ID;
      const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
      const EMAIL_JS_URL = process.env.EMAIL_JS_URL!;
      const response = await axios.post(EMAIL_JS_URL, {
        service_id: SERVICE_ID, // Replace with your EmailJS Service ID
        template_id: TEMPLATE_ID_MESSAGE, // Replace with your EmailJS Template ID
        user_id: USER_ID, // Replace with your EmailJS User ID
        accessToken: ACCESS_TOKEN,
        template_params: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          message: dto.message,
          subject: "al-KALAM Contact Form",
        },
      });
      console.log("response", response);
    } catch (error) {
      console.log("error....", error);
    }
  }
}
