import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class UpdateConsultationRequestDto {
  @ApiProperty({
    type: String,
    example: 'Consultation report content here (consultant should fill this)',
    description: 'Report from the consultation',
  })
  @IsOptional()
  @IsString()
  consultationReport?: string;

  @ApiProperty({
    type: String,
    example:
      'Recommend MRI and follow-up in 3 weeks (consultant should fill this)',
    description: 'Recommendations following the consultation',
  })
  @IsOptional()
  @IsString()
  recommendations?: string;
}
