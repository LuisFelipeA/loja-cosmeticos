import { Controller, Get, Query, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {} // inicia service

    @Post()
    @Public()
    create(@Body() createUserDto: CreateUserDTO): Promise<UserEntity> {
        return this.userService.create(createUserDto);        
    }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserEntity> {
        return await this.userService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() updateUserDTO: UpdateUserDTO) {
        return this.userService.update(id, updateUserDTO);
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.userService.remove(id);
    }
}