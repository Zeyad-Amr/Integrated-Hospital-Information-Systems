import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AdditionalInformation } from 'src/incident/dto/create-incident.dto';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CompanionDto extends CreatePersonDto {
  @ApiProperty({ type: String, example: 1, required: false })
  @IsNotEmpty()
  @IsInt()
  kinshipId: number;
}

export class VisitDto {
  @ApiProperty({ type: Number, example: 55, required: true })
  @IsInt()
  @IsNotEmpty()
  sequenceNumber: number;
}

export class Transfer {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  toSubDepId: number;


  @ApiProperty({ type: String, example: '2021-10-10T10:00:00Z' })
  @IsOptional()
  transferDate: Date;
}
export class CreateVisitDto {
  @ApiProperty({ type: CreatePersonDto, required: true })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  patient: CreatePersonDto;

  @ApiProperty({ type: CompanionDto, required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CompanionDto)
  companion: CompanionDto;

  @ApiProperty({ type: VisitDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => VisitDto)
  visit: VisitDto;

  @ApiProperty({ type: AdditionalInformation })
  @ValidateNested()
  @Type(() => AdditionalInformation)
  additionalInfo: AdditionalInformation;

  @ApiProperty({ type: Transfer, required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Transfer)
  transfer: Transfer;
}
