import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffDto } from './create-staff.dto';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional } from "class-validator";


export class UpdateStaffDto extends PartialType(CreateStaffDto) {
    @IsOptional()
    name: string

    @IsOptional()
    ssn: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsMobilePhone()
    phone: string

    @IsOptional()
    role: string
}
