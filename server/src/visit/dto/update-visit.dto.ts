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
}

export class UpdateVisitStatus {
    @ApiProperty({ type: String, example: 'TRANSFERED' })
    @IsNotEmpty()
    status: VisitStatus;
}
