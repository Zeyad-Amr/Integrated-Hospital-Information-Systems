import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRadiologyImageDto
  implements Omit<Prisma.ImageCreateInput, 'patient' | 'visit'>
{
  @ApiProperty({
    type: String,
    example: 'X-Ray',
    description: 'Name of the lab test',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'https://radiologytest.com',
    description: 'url for the radology test',
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
