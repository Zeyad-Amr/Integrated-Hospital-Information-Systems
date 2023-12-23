import { ApiProperty } from '@nestjs/swagger';
import { Comorbidity, ConsciousnessLevel, Triage } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Validate,
    ValidateNested,
} from 'class-validator';
import { IsValidEnumValue } from 'src/shared/special-validator';

export class VitalsDto {
    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    CVP: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    GCS: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    painScore: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    PR: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    RR: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    SpO2: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    temp: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    SBP: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    DBP: number;
}

export class TriageAXDto {
    @ApiProperty({
        type: String,
        example: 'Fall on Stairs',
    })
    @IsNotEmpty()
    @IsString()
    mainComplaint: string;

    @ApiProperty({
        type: String,
        example: 'ALERT',
        description: "level of consciousness"
    })
    @IsOptional()
    @Validate(IsValidEnumValue, [ConsciousnessLevel])
    LOC: ConsciousnessLevel;

    @ApiProperty({
        type: String,
        example: 'STANDARD',
    })
    @IsString()
    @IsNotEmpty()
    @Validate(IsValidEnumValue, [Triage])
    triage: Triage;

    @ApiProperty({
        type: String,
        example: ["DIABETES", "OBESITY"],
    })
    @IsArray()
    @IsNotEmpty()
    @Validate(IsValidEnumValue, [Comorbidity], { each: true })
    comorbidities: Comorbidity[];

    @ApiProperty({
        type: String,
        example: 'Triage A',
    })
    @IsNotEmpty()
    @IsString()
    transferTo: string;

    @ApiProperty({ type: VitalsDto, required: false })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => VitalsDto)
    vitals: VitalsDto;

}
