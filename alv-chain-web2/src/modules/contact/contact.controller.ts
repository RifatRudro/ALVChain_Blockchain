
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { ContactService } from "./contact.service";
import { ContactDto } from "./dto/contact.dto";

@Controller("contact")
export class ContactController {
  constructor(
    private readonly ContactService: ContactService,
  ) {}

  @Post()
  createOne(
    @Body(new ValidationPipe()) body: ContactDto,
  ) {
    return this.ContactService.sendEmails(body);
  }


}
