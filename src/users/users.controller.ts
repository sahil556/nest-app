import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-dto.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(): Promise<CreateUserDto[]>
    {
        return this.usersService.findAllUsers();
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto)
    {
        console.log(userDto);
        this.usersService.saveUser(userDto);
    }
}
