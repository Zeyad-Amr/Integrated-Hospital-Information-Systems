import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateAllergyDto
  implements Omit<Prisma.AllergyCreateInput, 'patient' | 'referedBy'>
{
  @ApiProperty({
    type: String,
    example: 'Peanuts',
    description: 'Name of the allergen',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: '2024-01-01T00:00:00Z',
    description: 'Date when the allergy was first noted',
  })
  @IsOptional()
  @IsDateString()
  beginDate?:  Date;

  @ApiProperty({
    type: String,
    example: '2024-12-31T23:59:59Z',
    description: 'Date when the allergy resolved, if applicable',
  })
  @IsOptional()
  @IsDateString()
  endDate?:  Date;

  @ApiProperty({
    type: String,
    example: 'Hives',
    description: 'Reaction caused by the allergen',
  })
  @IsOptional()
  @IsString()
  reaction?: string;

  @ApiProperty({
    type: String,
    example: 'Severe',
    description: 'Severity of the allergic reaction',
  })
  @IsOptional()
  @IsString()
  severity?: string;

  @ApiProperty({
    type: String,
    example: 'Occasional',
    description: 'Occurrence of the allergic reaction',
  })
  @IsOptional()
  @IsString()
  occurrence?: string;

  @ApiProperty({
    type: String,
    example: 'Confirmed',
    description: 'Verification method or notes about the allergy',
  })
  @IsOptional()
  @IsString()
  verification?: string;

  @ApiProperty({
    type: String,
    example: 'Avoid all products containing peanuts',
    description: 'Additional comments about the allergy',
  })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  patientId: string;
}
