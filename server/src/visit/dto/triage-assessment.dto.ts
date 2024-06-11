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
        type: Number,
        example: 1,
        description: "level of consciousness"
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

    @ApiProperty({
        type: Number,
        example: [1, 2],
    })
    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    comorbidityIds: number[];

    @ApiProperty({
        type: Number,
        example: 1,
    })
    @IsNotEmpty()
    @IsInt()
    transferFromId: number;

    @ApiProperty({
        type: Number,
        example: 2,
    })
    @IsNotEmpty()
    @IsInt()
    transferToId: number;

    @ApiProperty({ type: VitalsDto, required: false })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => VitalsDto)
    vitals: VitalsDto;

    @ApiProperty({
        type: Transfer,
        required: false,
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Transfer)
    transfer: Transfer;


}
