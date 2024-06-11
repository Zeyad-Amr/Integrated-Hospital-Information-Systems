import { ApiProperty } from "@nestjs/swagger";
import { VisitStatus } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTransferDto {

    @ApiProperty({ type: Number, example: 2 })
    @IsNotEmpty()
    toSubDepId: number;

    @ApiProperty({ type: String, example: '1' })
    @IsNotEmpty()
    visitCode: string;

    @ApiProperty({ type: String, example: '2021-10-10T10:00:00Z' })
    @IsOptional()
    transferDate: Date;

    @ApiProperty({ type: String, example: 'TRANSFERED' })
    @IsOptional()
    visitStatus: VisitStatus;

}
