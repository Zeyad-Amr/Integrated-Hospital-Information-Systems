import { ApiProperty } from "@nestjs/swagger";
import { IsArray,  IsNotEmpty, IsNumber,  IsOptional, IsString, } from "class-validator";

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
    @IsNumber()
    @IsOptional()
    departmentId: number
}


class RoleFeature {

    @ApiProperty({ required: true, example: 1 })
    @IsNumber()
    roleId: number

    //array
    @ApiProperty({ required: true, example: [1, 2] })
    @IsArray()
    features: number[]
}
export class AssignFeatures {

    @ApiProperty({ required: true, type: [RoleFeature] })
    @IsArray()
    // @ValidateNested()
    AddedFeatures: RoleFeature[]

    @ApiProperty({ required: true, type: [RoleFeature] })
    @IsArray()
    // @ValidateNested()
    RemovedFeatures: RoleFeature[]

}
