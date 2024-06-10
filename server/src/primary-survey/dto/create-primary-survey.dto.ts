import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreatePrimarySurveyDto
  implements
    Omit<Prisma.PrimarySurveyCreateInput, 'author' | 'visit'>
{
  @ApiProperty({
    type: String,
    example: 'Clear',
    description: 'Assessment of the airway',
  })
  @IsNotEmpty()
  @IsString()
  airway: string;

  @ApiProperty({
    type: String,
    example: 'Normal',
    description: 'Assessment of breathing',
  })
  @IsNotEmpty()
  @IsString()
  breathing: string;

  @ApiProperty({
    type: String,
    example: 'Stable',
    description: 'Assessment of circulation',
  })
  @IsNotEmpty()
  @IsString()
  circulation: string;

  @ApiProperty({
    type: String,
    example: 'No deficits',
    description: 'Assessment of disability',
  })
  @IsNotEmpty()
  @IsString()
  disability: string;

  @ApiProperty({
    type: String,
    example: 'No significant findings',
    description: 'Assessment of exposure',
  })
  @IsNotEmpty()
  @IsString()
  exposure: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  visitCode: string;
}
