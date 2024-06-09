import { PartialType } from '@nestjs/swagger';
import { CreateConsultationRequestDto } from './create-consultation-request.dto';

export class UpdateConsultationRequestDto extends PartialType(CreateConsultationRequestDto) {}
