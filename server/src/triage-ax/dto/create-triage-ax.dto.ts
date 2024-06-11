import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTriageAxDto
  implements Omit<Prisma.TriageAxCreateInput, 'visit'>
{
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'pain score',
  })
  @IsOptional()
  @IsInt()
  painScore?: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'level of consciousness',
  })
  @IsOptional()
  @IsInt()
  LOCId: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  triageTypeId: number;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  visitCode: string;
}
