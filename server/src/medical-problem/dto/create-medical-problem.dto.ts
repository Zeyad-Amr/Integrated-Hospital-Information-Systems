import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateMedicalProblemDto
  implements Omit<Prisma.MedicalProblemCreateInput, 'patient' | 'referedBy'>
{
  @ApiProperty({
    type: String,
    example: 'Hypertension',
    description: 'Name of the medical problem',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: '2023-01-01T00:00:00Z',
    description: 'Date when the medical problem began',
  })
  @IsOptional()
  @IsDateString()
  beginDate?: Date;

  @ApiProperty({
    type: String,
    example: '2023-12-31T23:59:59Z',
    description: 'Date when the medical problem ended',
  })
  @IsOptional()
  @IsDateString()
  endDate?:  Date;

  @ApiProperty({
    type: String,
    example: 'Confirmed',
    description: 'Verification method or notes about the medical problem',
  })
  @IsOptional()
  @IsString()
  verification?: string;

  @ApiProperty({
    type: String,
    example: 'Patient should monitor blood pressure daily',
    description: 'Additional comments about the medical problem',
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
