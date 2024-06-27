import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Transfer } from './create-visit.dto';
import { CreateTriageAxDto } from 'src/triage-ax/dto/create-triage-ax.dto';
import { CreateVitalDto } from 'src/vitals/dto/create-vital.dto';

export class VitalsDto {
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
}

export class TriageDto{
    @ApiProperty({
        type: Number,
        example: 1,
        description: 'pain score',
      })
      @IsOptional()
      @IsInt()
      painScore?: number;
    
      @ApiProperty({
        type: Number,
        example: 1,
        description: 'level of consciousness',
      })
      @IsOptional()
      @IsInt()
      LOCId: number;
    
      @ApiProperty({
        type: Number,
        example: 1,
      })
      @IsOptional()
      @IsInt()
      triageTypeId: number;
    
}
export class TriageAXDto {
    @ApiProperty({
        type: String,
        example: 'Fall on Stairs',
    })
    @IsNotEmpty()
    @IsString()
    mainComplaint: string;

    @ApiProperty({ type: Number, example: 1 })
    @IsNotEmpty()
    toSubDepId: number;


    @ApiProperty({ type: TriageDto, required: false })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TriageDto)
    triage: TriageDto
    

    @ApiProperty({ type: VitalsDto, required: false })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => VitalsDto)
    vitals: VitalsDto;

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
