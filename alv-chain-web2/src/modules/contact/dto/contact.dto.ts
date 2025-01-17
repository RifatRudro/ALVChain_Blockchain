import { IsNotEmpty, IsOptional } from "class-validator";

export class ContactDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phone: string;

    // @IsNotEmpty()
    // subject:string

    @IsNotEmpty()
    message: string;
}  