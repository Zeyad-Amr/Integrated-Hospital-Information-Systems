import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateMedicationDto
  implements Omit<Prisma.MedicationCreateInput, 'patient' | 'referedBy'>
{
  @ApiProperty({
    type: String,
    example: 'Aspirin',
    description: 'Name of the drug',
  })
  @IsNotEmpty()
  @IsString()
  drugName: string;

  @ApiProperty({
    type: String,
    example: '2024-06-09T12:00:00Z',
    description: 'Start date of the medication',
  })
  @IsNotEmpty()
  @IsDateString()
  beginDate: Date;

  @ApiProperty({
    type: String,
    example: '2024-07-09T12:00:00Z',
    description: 'End date of the medication',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({
    type: String,
    example: 'Take one tablet daily',
    description: 'Instructions on how to use the medication',
  })
  @IsOptional()
  @IsString()
  medicationUsage?: string;

  @ApiProperty({
    type: String,
    example: 'Take after meals',
    description: 'Dosage instructions for the medication',
  })
  @IsOptional()
  @IsString()
  dosageInstruction?: string;

  @ApiProperty({
    type: String,
    example: 'Monitor for any side effects',
    description: 'Additional comments about the medication',
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
