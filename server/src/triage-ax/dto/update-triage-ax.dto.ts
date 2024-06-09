import { PartialType } from '@nestjs/swagger';
import { CreateTriageAxDto } from './create-triage-ax.dto';

export class UpdateTriageAxDto extends PartialType(CreateTriageAxDto) {}
