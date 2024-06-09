import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreatePrescriptionDto
  implements
    Omit<Prisma.PrescriptionCreateInput, 'patient' | 'author' | 'visit'>
{
  @ApiProperty({
    type: String,
    example: 'Ibuprofen',
    description: 'Name of the drug',
  })
  @IsNotEmpty()
  @IsString()
  drugName: string;

  @ApiProperty({
    type: String,
    example: '2024-06-09T12:00:00Z',
    description: 'Start date of the prescription',
  })
  @IsNotEmpty()
  @IsDateString()
  beginDate: Date;

  @ApiProperty({
    type: Number,
    example: 30,
    description: 'Quantity of the drug prescribed',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    example: '20mg',
    description: 'Unit of the medicine',
  })
  @IsOptional()
  @IsString()
  medicineUnit?: string;

  @ApiProperty({
    type: String,
    example: 'Take one tablet daily',
    description: 'Dosage instructions for the drug',
  })
  @IsNotEmpty()
  @IsString()
  dosage: string;

  @ApiProperty({
    type: String,
    example: '2 refills',
    description: 'Number of refills allowed',
  })
  @IsOptional()
  @IsString()
  refills?: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Whether substitution with a generic drug is allowed',
  })
  @IsNotEmpty()
  @IsBoolean()
  substitutionAllowed: boolean;

  @ApiProperty({
    type: String,
    example: 'Take with food to avoid stomach upset',
    description: 'Additional notes about the prescription',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  visitCode: string;
}
