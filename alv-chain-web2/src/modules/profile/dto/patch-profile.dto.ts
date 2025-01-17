import { IsOptional } from "class-validator";

export class PatchProfileDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  mobile?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  user_id?: number;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
