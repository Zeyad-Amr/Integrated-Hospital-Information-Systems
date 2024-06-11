import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateConsultationRequestDto
  implements
    Omit<
      Prisma.ConsultationRequestCreateInput,
      'patient' | 'visit' | 'requester' | 'consultant'
    >
{
  @ApiProperty({
    type: String,
    example: '2024-06-09T12:00:00Z',
    description: 'Date of the consultation request',
  })
  @IsOptional()
  @IsDateString()
  requestDate?:  Date;

  @ApiProperty({
    type: String,
    example: 'Patient needs further evaluation',
    description: 'Additional notes regarding the consultation request',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    type: String,
    example: 'Severe headaches',
    description: 'Reason for the consultation request',
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    type: String,
    example: 'Patient exhibits symptoms of migraine',
    description: 'Clinical data related to the consultation request',
  })
  @IsOptional()
  @IsString()
  clinicalData?: string;

  @ApiProperty({
    type: String,
    example: 'Consultation report content here (consultant should fill this)',
    description: 'Report from the consultation',
  })
  @IsOptional()
  @IsString()
  consultationReport?: string;

  @ApiProperty({
    type: String,
    example: 'Recommend MRI and follow-up in 2 weeks (consultant should fill this)',
    description: 'Recommendations following the consultation',
  })
  @IsOptional()
  @IsString()
  recommendations?: string;

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

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  consultantId: string;
}
