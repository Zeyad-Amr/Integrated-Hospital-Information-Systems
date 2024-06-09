import { PartialType } from '@nestjs/swagger';
import { CreateRadiologyImageDto } from './create-radiology-image.dto';

export class UpdateRadiologyImageDto extends PartialType(CreateRadiologyImageDto) {}
