import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { UpdateUserDTO } from './dtos/updateUser.dto';

@Injectable()
export class UserService {

    // Inicia repositorio
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){ }

    // cria usuario
    async create(createUserDto: CreateUserDTO): Promise<UserEntity> {
        
        // criptografa senha
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        // salva no banco
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed,
        })

    }

    // lista todos usuarios
    async findAll(): Promise<UserEntity[]> {

        const userList = await this.userRepository.find(); // busca usuarios

        // valida se encontrou
        if (!userList || userList.length === 0) {
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND); // retorna status 404 se não encontrar
        }

        return userList;
    }

    // busca usuario por id
    async findById(idUser: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({id: Number(idUser)}); // busca usuario

        // valida se encontrou
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND); // retorna status 404 se não encontrar
        }

        return user;
    }

    // busca pelo nome
    async findByName(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { name: username } });
    }

    // atualiza usuario
    async update(idUser: string, updateUserDto: UpdateUserDTO): Promise<UserEntity> {
        const user = await this.findById(idUser); // busca usuario

        // valida se encontrou
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND); // retorna status 404 se não encontrar
        }

        // caso seja alterado a senha, criptografar
        if (updateUserDto.password) {
            const saltOrRounds = 10;
            updateUserDto.password = await hash(updateUserDto.password, saltOrRounds);
        }

        Object.assign(user, updateUserDto); // atualiza valores

        return this.userRepository.save(user); // salva no banco
    }

    // deleta usuário
    async remove(idUser: string): Promise<string> {
        const user = await this.findById(idUser); // busca o usuário

        // valida se encontrou
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND); // retorna status 404 se não encontrar
        }

        await this.userRepository.remove(user); // deleta o usuário

        return 'User deleted'
    }

}
