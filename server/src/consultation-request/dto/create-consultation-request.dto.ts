import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';
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
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  consultationSubdepartmentId: number;
}
