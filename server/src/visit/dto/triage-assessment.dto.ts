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
    @IsInt()
    LOCId: number;

    @ApiProperty({
        type: String,
        example: 'STANDARD',
    })
    @IsOptional()
    @IsInt()
    triageTypeId: number;

    @ApiProperty({
        type: String,
        example: ["DIABETES", "OBESITY"],
    })
    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    comorbidityIds: number[];

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
