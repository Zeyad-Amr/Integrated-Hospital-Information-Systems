import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateFeatureDto {

    @ApiProperty({ required: true, example: 'Cardiology test' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ required: true, example: 1 })
    @IsNumber()
    @IsOptional()
    subDepartmentId: number

}
