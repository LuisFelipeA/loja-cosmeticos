import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    @Length(3, 100)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsString()
    @Length(11, 14)
    cpf?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    typeUser?: number;

    @IsOptional()
    address?: string;
}
