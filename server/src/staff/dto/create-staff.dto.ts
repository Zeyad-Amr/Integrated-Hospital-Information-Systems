import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional } from "class-validator";

export class CreateStaffDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    ssn: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsMobilePhone()
    phone: string

    @IsOptional()
    role: string
}
