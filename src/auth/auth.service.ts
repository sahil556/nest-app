import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService){}

    async signIn(username: string, pass: string): Promise<{access_token: string}>{
        const user = await this.usersService.findOne(username);

        // must have some short of password encryption using salt and validation 
        if(user?.password !== pass)
        {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.userName };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
