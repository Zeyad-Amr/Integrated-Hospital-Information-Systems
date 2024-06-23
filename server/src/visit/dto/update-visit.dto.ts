import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVisitDto } from './create-visit.dto';
import { VisitStatus } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVisitDto  { 
    @ApiProperty({
      type: String,
      example: 'Fall on Stairs',
    })
    @IsOptional()
    @IsString()
    mainComplaint: string;

    @ApiProperty({ type: Number, example: 1 })
    @IsNotEmpty()
    toSubDepId: number;
}

export class UpdateVisitStatus {
    @ApiProperty({ type: String, example: 'TRANSFERED' })
    @IsNotEmpty()
    status: VisitStatus;
}
