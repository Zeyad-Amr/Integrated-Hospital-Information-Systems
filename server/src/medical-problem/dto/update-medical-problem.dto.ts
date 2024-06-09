import { PartialType } from '@nestjs/swagger';
import { CreateMedicalProblemDto } from './create-medical-problem.dto';

export class UpdateMedicalProblemDto extends PartialType(CreateMedicalProblemDto) {}
