import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePermissionDto {

    @ApiProperty({ required: true, example: 1 })
    @IsNumber()
    subdepartmentId: number;

    @ApiProperty({ required: true, example: 1 })
    @IsNumber()
    featureId: number;

    @ApiProperty({ required: true, example: 1 })
    @IsNumber()
    roleId: number;

}
