import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CarNumber {
  @ApiProperty({ type: String, example: 'و' })
  @IsString()
  @Length(1)
  firstChar: string;

  @ApiProperty({ type: String, example: 'س' })
  @IsString()
  @Length(1)
  @IsOptional()
  secondChar: string;

  @ApiProperty({ type: String, example: 'أ' })
  @IsString()
  @Length(1)
  @IsOptional()
  thirdChar: string;

  @ApiProperty({ type: Number, example: '136' })
  @IsNumber()
  @IsNotEmpty()
  number: number;
}

export class Attendant {
  @ApiProperty({ type: String, example: 'Ahmed' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: '1234' })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ type: String, example: '50003105406664' })
  @IsOptional()
  @IsString()
  SSN;

  @ApiProperty({ type: String, example: 'PARAMEDIC' })
  @IsOptional()
  @IsInt()
  roleId: number;
}

export class AdditionalInformation {
  @ApiProperty({ type: String, example: 'HOME', required: false })
  @IsOptional()
  @IsInt()
  cameFromId: number;

  @ApiProperty({ type: String, example: 'Giza' })
  @IsOptional()
  @IsString()
  injuryLocation: string;

  @ApiProperty({ type: String, example: 'Fight' })
  @IsOptional()
  @IsString()
  injuryCause: string;

  @ApiProperty({ type: String, example: '3 persons fight with guns' })
  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({ type: CarNumber })
  @ValidateNested()
  @Type(() => CarNumber)
  car: CarNumber;

  @ApiProperty({ type: Attendant })
  @IsOptional()
  @ValidateNested()
  @Type(() => Attendant)
  attendant: Attendant;
}

export class CreateIncidentDto {
  @ApiProperty({ type: Number, example: 10 })
  @IsInt()
  @IsNotEmpty()
  numerOfPatients: number;

  @ApiProperty({ type: AdditionalInformation })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdditionalInformation)
  additionalInfo: AdditionalInformation;

  @ApiProperty({ type: [CreatePersonDto] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  companions: CreatePersonDto[];
}
