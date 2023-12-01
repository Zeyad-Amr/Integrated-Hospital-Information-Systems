import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, IdentityEnum } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidEnumValue } from 'src/shared/special-validator';

export class UpdatePersonDto {
  @ApiProperty({
    type: String,
    example: 'Ahmed',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Raouf',
  })
  @IsString()
  @IsOptional()
  secondName: string;

  @ApiProperty({
    type: String,
    example: 'Mohamed',
  })
  @IsString()
  @IsOptional()
  thirdName: string;

  @ApiProperty({
    type: String,
    example: 'Hussein',
  })
  @IsString()
  @IsOptional()
  fourthName: string;

  @ApiProperty({
    type: String,
    example: '30002103105556',
  })
  @IsString()
  @IsOptional()
  SSN: string;

  @ApiProperty({
    type: String,
    example: 'NATIONALIDCARD',
  })
  @IsOptional()
  @Validate(IsValidEnumValue, [IdentityEnum])
  verificationMethod: IdentityEnum;

  @ApiProperty({
    type: String,
    example: 'MALE',
  })
  @IsString()
  @IsOptional()
  @Validate(IsValidEnumValue, [GenderEnum])
  gender: GenderEnum;

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
    type: String,
    example: 'diaabadr82@gmail.com',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'Giza',
  })
  @IsString()
  @IsOptional()
  governate: string;

  @ApiProperty({
    type: String,
    example: '6th of october',
  })
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  updatedAt: Date;
}
