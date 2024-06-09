import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateDiagnosisDto
  implements Omit<Prisma.DiagnosisCreateInput, 'patient' | 'visit' | 'author'>
{
  @ApiProperty({
    type: String,
    example: 'Hypertension',
    description: 'Name of the diagnosis',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'High blood pressure',
    description: 'Description of the diagnosis',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: String,
    example: 'I10',
    description:
      'ICD (International Classification of Diseases) code for the diagnosis',
  })
  @IsOptional()
  @IsString()
  icdCode?: string;

  @ApiProperty({
    type: String,
    example: 'Provisional',
    description: 'Should be provisional or final',
  })
  @IsOptional()
  @IsString()
  type?: string;

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
