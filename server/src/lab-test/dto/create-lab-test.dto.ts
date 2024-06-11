import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLabTestDto
  implements Omit<Prisma.LabTestCreateInput, 'patient' | 'visit'>
{
  @ApiProperty({
    type: String,
    example: 'CBC',
    description: 'Name of the lab test',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'https://labtest.com',
    description: 'url for the lab test',
  })
  @IsOptional()
  @IsString()
  url?: string;

  
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
