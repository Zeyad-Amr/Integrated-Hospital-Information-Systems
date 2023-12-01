import { ApiProperty } from '@nestjs/swagger';
import { KinshipEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CarNumber } from 'src/incident/dto/create-incident.dto';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { IsValidEnumValue } from 'src/shared/special-validator';

export class VisitDto {
  @ApiProperty({ type: Number, example: 55, required: true })
  @IsInt()
  @IsNotEmpty()
  sequenceNumber: number;

  @ApiProperty({ type: String, example: 'BROTHER', required: false })
  @IsOptional()
  @Validate(IsValidEnumValue, [KinshipEnum])
  kinship: KinshipEnum;
}

export class CreateVisitDto {
  @ApiProperty({ type: CreatePersonDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  patient: CreatePersonDto;

  @ApiProperty({ type: CreatePersonDto, required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  companion: CreatePersonDto;

  @ApiProperty({ type: VisitDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => VisitDto)
  visit: VisitDto;

  @IsOptional()
  @IsObject()
  @ApiProperty({ type: CarNumber })
  @ValidateNested()
  @Type(() => CarNumber)
  car: CarNumber;

  @ApiProperty({ type: String, example: 'Ahmed Mohamed' })
  @IsOptional()
  @IsString()
  attendantName;

  @ApiProperty({ type: String, example: '123456' })
  @IsOptional()
  @IsString()
  attendantId;
}

export class AnonymousVisitDto {
  @ApiProperty({ type: Number, example: 55, required: true })
  @IsInt()
  @IsNotEmpty()
  sequenceNumber: number;

  @ApiProperty({ type: CreatePersonDto, required: false })
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  companion: CreatePersonDto;

  @ApiProperty({ type: String, example: 'BROTHER', required: false })
  @IsOptional()
  @Validate(IsValidEnumValue, [KinshipEnum])
  kinship: KinshipEnum;

  @IsOptional()
  @IsObject()
  @ApiProperty({ type: CarNumber })
  @ValidateNested()
  @Type(() => CarNumber)
  car: CarNumber;

  @ApiProperty({ type: String, example: 'Ahmed Mohamed' })
  @IsOptional()
  @IsString()
  attendantName;

  @ApiProperty({ type: String, example: '123456' })
  @IsOptional()
  @IsString()
  attendantId;
}
