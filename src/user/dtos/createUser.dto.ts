import { IsEmail, IsNotEmpty, IsPhoneNumber, Length, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Length(11, 14)
    cpf: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
