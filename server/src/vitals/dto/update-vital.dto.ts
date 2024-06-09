import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVitalDto } from './create-vital.dto';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateVitalDto {
    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    CVP?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    GCS?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    PR?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    RR?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    SpO2?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    temp?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    SBP?: number;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    DBP?: number;
   
    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    weight?: number;
  
    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    @IsInt()
    height?: number;
    
}
