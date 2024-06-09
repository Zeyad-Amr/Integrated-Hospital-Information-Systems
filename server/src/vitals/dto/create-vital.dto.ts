import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVitalDto
  implements Omit<Prisma.VitalsCreateInput, 'patient' | 'author' | 'visit'>
{
  @ApiProperty({
    type: Number,
    example: 8,
    description: 'Central Venous Pressure, normal range is typically 2-8 mmHg',
  })
  @IsOptional()
  @IsInt()
  CVP?: number; // Central Venous Pressure

  @ApiProperty({
    type: Number,
    example: 15,
    description:
      'Glasgow Coma Scale, ranges from 3 to 15, with 15 being fully awake and responsive',
  })
  @IsOptional()
  @IsInt()
  GCS?: number; // Glasgow Coma Scale

  @ApiProperty({
    type: Number,
    example: 72,
    description: 'Pulse Rate, typical normal range is 60-100 beats per minute',
  })
  @IsOptional()
  @IsInt()
  PR?: number; // Pulse Rate

  @ApiProperty({
    type: Number,
    example: 18,
    description:
      'Respiratory Rate, typical normal range is 12-20 breaths per minute',
  })
  @IsOptional()
  @IsInt()
  RR?: number; // Respiratory Rate

  @ApiProperty({
    type: Number,
    example: 98.6,
    description: 'Oxygen Saturation, typically measured as a percentage',
  })
  @IsOptional()
  @IsNumber()
  SpO2?: number; // Oxygen Saturation

  @ApiProperty({
    type: Number,
    example: 37.0,
    description: 'Body Temperature, typically measured in degrees Celsius',
  })
  @IsOptional()
  @IsNumber()
  temp?: number; // Temperature

  @ApiProperty({
    type: Number,
    example: 120,
    description:
      'Systolic Blood Pressure, typical normal range is around 90-120 mmHg',
  })
  @IsOptional()
  @IsInt()
  SBP?: number; // Systolic Blood Pressure

  @ApiProperty({
    type: Number,
    example: 80,
    description:
      'Diastolic Blood Pressure, typical normal range is around 60-80 mmHg',
  })
  @IsOptional()
  @IsInt()
  DBP?: number; // Diastolic Blood Pressure

  @ApiProperty({
    type: Number,
    example: 70,
    description: 'Weight in kilograms',
  })
  @IsOptional()
  @IsInt()
  weight?: number; // Weight

  @ApiProperty({
    type: Number,
    example: 175,
    description: 'Height in centimeters',
  })
  @IsOptional()
  @IsInt()
  height?: number; // Height

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
