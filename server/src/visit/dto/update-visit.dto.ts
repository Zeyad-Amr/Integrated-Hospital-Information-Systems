import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVisitDto } from './create-visit.dto';
import { VisitStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateVisitDto extends PartialType(CreateVisitDto) { }

export class UpdateVisitStatus {
    @ApiProperty({ type: String, example: 'TRANSFERED' })
    @IsNotEmpty()
    status: VisitStatus;
}
