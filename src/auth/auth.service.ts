import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService){}

    async signIn(username: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(username);

        // must have some short of password encryption using salt and validation 
        if(user?.password !== pass)
        {
            throw new UnauthorizedException();
        }
        const {password, ...rest} = user;
        return rest;
    }
}
