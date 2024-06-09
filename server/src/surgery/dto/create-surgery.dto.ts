import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSurgeryDto implements Omit<Prisma.SurgeryCreateInput,'patient' | 'visit' | 'author'> {
    @ApiProperty({
        type: String,
        example: "Appendectomy"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        example: "Surgery to remove the appendix"
    })
    @IsOptional()
    @IsString()
    description?: string;
    
    @ApiProperty({
        type: String,
        example: "Abdomen"
    })
    @IsOptional()
    @IsString()
    place?: string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    patientId: string
    
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    visitCode: string
}
