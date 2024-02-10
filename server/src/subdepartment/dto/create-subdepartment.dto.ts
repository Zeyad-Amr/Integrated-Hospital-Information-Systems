import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSubdepartmentDto {
    @ApiProperty({ required: true, example: 'Cardiologist' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true, example: 1 })
    @IsNumber()
    roomId: number;

    @ApiProperty({ required: true, example: 1 })
    @IsNumber()
    specializationId: number

    @ApiProperty({ required: false, example: '1' })
    @IsString()
    @IsOptional()
    departmentId: string
}
