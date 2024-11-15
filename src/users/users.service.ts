import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>)
    {}

    public async findOne(username: string) : Promise<User | undefined>
    {
        return await this.userRepository.findOneBy({userName: username});
    }

    public async findAllUsers() : Promise<User[]>
    {
        return await this.userRepository.find();
    }
}
