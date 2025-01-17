import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProfileDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  mobile?: string;

  @IsOptional()
  address?: string;

  @IsNotEmpty()
  user_id!: number;

  @IsOptional()
  createdAt?: Date;
}
