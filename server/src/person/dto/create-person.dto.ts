import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    type: String,
    example: 'Ahmed',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Raouf',
  })
  @IsNotEmpty()
  @IsString()
  secondName: string;

  @ApiProperty({
    type: String,
    example: 'Mohamed',
  })
  @IsNotEmpty()
  @IsString()
  thirdName: string;

  @ApiProperty({
    type: String,
    example: 'Hussein',
  })
  @IsNotEmpty()
  @IsString()
  fourthName: string;

  @ApiProperty({
    type: String,
    example: '30002103105556',
  })
  @IsOptional()
  @IsString()
  SSN: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  verificationMethodId: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  genderId: number;

  @ApiProperty({
    type: String,
    example: '2000-05-10T00:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    type: String,
    example: '+201098157522',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  governateId: number;

  @ApiProperty({
    type: String,
    example: '6th of october',
  })
  @IsOptional()
  @IsString()
  address: string;
}
