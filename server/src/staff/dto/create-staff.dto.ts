import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ type: String, description: "staff name (required field)", example: "Raouf" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: "staff SSN (required field)", example: "30003106108898" })
  @IsNotEmpty()
  ssn: string;

  @ApiProperty({ type: String, description: "staff email (required field)", example: "raouf@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: "staff phone (required field)", example: "01098157733" })
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @ApiProperty({ type: String, description: "staff role (optional field)", example: "receptionist" })
  @IsOptional()
  role: string;
}
